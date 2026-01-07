import { validarReporte } from '../validarReporte';

describe('validarReporte middleware', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('debe retornar 400 si falta ciudad', () => {
    const req: any = { body: { tipo: 'inundacion', descripcion: 'desc' } };
    const res = mockRes();
    const next = jest.fn();

    validarReporte(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    expect(next).not.toHaveBeenCalled();
  });

  it('debe aceptar alias tipoIncidencia y normalizar a req.body.tipo', () => {
    const req: any = { body: { ciudad: 'Madrid', tipoIncidencia: 'inundacion', descripcion: 'descripcion larga' } };
    const res = mockRes();
    const next = jest.fn();

    validarReporte(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body.tipo).toBe('inundacion');
  });

  it('debe aceptar alias titulo y normalizar a req.body.tipo', () => {
    const req: any = { body: { ciudad: 'Madrid', titulo: 'inundacion', descripcion: 'descripcion larga' } };
    const res = mockRes();
    const next = jest.fn();

    validarReporte(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body.tipo).toBe('inundacion');
  });

  it('debe retornar 400 si falta descripcion', () => {
    const req: any = { body: { ciudad: 'Madrid', tipo: 'inundacion' } };
    const res = mockRes();
    const next = jest.fn();

    validarReporte(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
