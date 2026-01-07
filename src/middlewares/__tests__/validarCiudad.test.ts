import { validarCiudad } from '../validarCiudad';

describe('validarCiudad middleware', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('debe retornar 400 si no se pasa el parámetro city', () => {
    const req: any = { params: {} };
    const res = mockRes();
    const next = jest.fn();

    validarCiudad(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si city está vacío', () => {
    const req: any = { params: { city: '   ' } };
    const res = mockRes();
    const next = jest.fn();

    validarCiudad(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si city tiene longitud < 2', () => {
    const req: any = { params: { city: 'A' } };
    const res = mockRes();
    const next = jest.fn();

    validarCiudad(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe retornar 400 si city tiene caracteres inválidos', () => {
    const req: any = { params: { city: 'City123' } };
    const res = mockRes();
    const next = jest.fn();

    validarCiudad(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe llamar next si city es válida', () => {
    const req: any = { params: { city: 'San Sebastián' } };
    const res = mockRes();
    const next = jest.fn();

    validarCiudad(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
