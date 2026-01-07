import { validarPaisPoblacion } from '../validarPaisGeo';

describe('validarPaisPoblacion middleware', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('debe retornar 400 si no se pasa el parámetro country', () => {
    const req: any = { params: {} };
    const res = mockRes();
    const next = jest.fn();

    validarPaisPoblacion(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si country no tiene 2 letras', () => {
    const req: any = { params: { country: 'E' } };
    const res = mockRes();
    const next = jest.fn();

    validarPaisPoblacion(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si country contiene números', () => {
    const req: any = { params: { country: 'E1' } };
    const res = mockRes();
    const next = jest.fn();

    validarPaisPoblacion(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe llamar next si country es válido (2 letras)', () => {
    const req: any = { params: { country: 'ES' } };
    const res = mockRes();
    const next = jest.fn();

    validarPaisPoblacion(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
