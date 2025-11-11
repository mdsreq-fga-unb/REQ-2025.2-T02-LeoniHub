// configurar variáveis de ambiente mínimas para evitar que módulos de
// configuração (ex.: closetChic.js) lancem erros ao serem importados
process.env.SUPABASE_CLOSETCHIC_URL = 'http://localhost';
process.env.SUPABASE_CLOSETCHIC_ANON_KEY = 'anon-key';
process.env.SUPABASE_LEONNI_URL = 'http://localhost';
process.env.SUPABASE_LEONNI_ANON_KEY = 'anon-key';

import { jest, test } from '@jest/globals';

let controller;
let mockSupabase;
let mockSupabaseSchema;
let createClient;
let getSupabaseClient;

beforeEach(async () => {
  jest.resetModules();

  // mockar módulos ESM antes de importar o módulo sob teste
  await jest.unstable_mockModule('@supabase/supabase-js', () => ({ createClient: jest.fn() }));
  await jest.unstable_mockModule('../src/config/db.js', () => ({ getSupabaseClient: jest.fn() }));

  // importar as implementações mockadas
  ({ createClient } = await import('@supabase/supabase-js'));
  ({ getSupabaseClient } = await import('../src/config/db.js'));

  mockSupabase = {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      getUser: jest.fn(),
      signOut: jest.fn(),
      admin: {
        deleteUser: jest.fn().mockResolvedValue({}),
        updateUserById: jest.fn().mockResolvedValue({})
      }
    }
  };


  const maybeSingle = jest.fn().mockResolvedValue({ data: null, error: null });
  const eq = jest.fn().mockReturnValue({ maybeSingle });
  const select = jest.fn().mockReturnValue({ eq, insert: jest.fn().mockResolvedValue({ error: null }) });
  const from = jest.fn().mockReturnValue({ select, insert: jest.fn().mockResolvedValue({ error: null }) });

  mockSupabaseSchema = {
    from,
    auth: {
      admin: {
        deleteUser: jest.fn().mockResolvedValue({}),
        updateUserById: jest.fn().mockResolvedValue({})
      },
      resetPasswordForEmail: jest.fn().mockResolvedValue({ data: null, error: null })
    }
  };

  // aplica implementações dos mocks exportados
  createClient.mockImplementation(() => mockSupabaseSchema);
  getSupabaseClient.mockImplementation(() => mockSupabase);

  // importa o módulo depois de configurar mocks para que createClient seja chamado mockado
  controller = await import('../src/controllers/authController.js');
});

function mockRes() {
  const res = {};
  res.status = jest.fn().mockImplementation(code => { res.statusCode = code; return res; });
  res.json = jest.fn().mockImplementation(obj => { res.body = obj; return res; });
  return res;
}

test('signup retorna 400 quando campos obrigatórios faltam, no caso, senha', async () => {
  const req = { body: { email: 'a@b.com' }, params: { lojaId: 'L1' } };
  const res = mockRes();
  await controller.signup(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.success).toBe(false);
});

test('login retorna 400 quando email falta', async () => {
  const req = { body: { password: 'senha123' }, params: { lojaId: 'L1' } };
  const res = mockRes();
  await controller.login(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.success).toBe(false);
});

test('signup detecta CPF existente e remove usuário criado (409)', async () => {
  // simula supabase.auth.signUp com usuário criado
  mockSupabase.auth.signUp.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null });

  // faz maybeSingle retornar objeto (CPF encontrado)
  const fromCall = mockSupabaseSchema.from();
  fromCall.select().eq().maybeSingle.mockResolvedValue({ data: { CPF: '123' }, error: null });

  const req = { body: { email: 'a@b.com', password: 'senha123', nome: 'Teste', cpf: '123' }, params: { lojaId: 'L1' } };
  const res = mockRes();

  await controller.signup(req, res);

  expect(mockSupabase.auth.signUp).toHaveBeenCalled();
  expect(res.statusCode).toBe(409);
  expect(res.body.success).toBe(false);
  expect(res.body.error).toMatch(/CPF/);

});

test('changePassword retorna 401 quando token inválido', async () => {
  // getUser retorna erro / sem usuário
  mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: { message: 'invalid' } });

  const req = { body: { token: 'bad-token', newPassword: 'novaSenha123' }, params: { lojaId: 'L1' } };
  const res = mockRes();

  await controller.changePassword(req, res);

  expect(res.statusCode).toBe(401);
  expect(res.body.success).toBe(false);
});

test('login retorna 401 quando credenciais inválidas', async () => {
  // simula supabase.auth.signInWithPassword com erro
  mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: null, error: { message: 'invalid' } });

  const req = { body: { email: 'user@x.com', password: 'senha123' }, params: { lojaId: 'L1' } };
  const res = mockRes();

  await controller.login(req, res);

  expect(res.statusCode).toBe(401);
  expect(res.body.success).toBe(false);
});


test('tentar recuperar senha retorna 200 quando email existe', async () => {
  // simula supabase.auth.resetPasswordForEmail sem erro
  mockSupabaseSchema.auth.resetPasswordForEmail.mockResolvedValue({ data: null, error: null });

  const req = { body: { email: 'user@x.com' }, params: { lojaId: 'L1' } };
  const res = mockRes();

  await controller.forgotPassword(req, res);

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
});
