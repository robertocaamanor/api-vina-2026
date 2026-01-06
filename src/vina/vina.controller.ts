import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { VinaService } from './vina.service';

@Controller('festival-vina-2026')
@ApiTags('festival-vina-2026')
@ApiBearerAuth('jwt')
export class VinaController {
  constructor(private readonly vinaService: VinaService) {}

  @Get('parrilla')
  obtenerParrilla() {
    return this.vinaService.getParrilla();
  }

  // Ejemplo de uso: GET /festival-vina-2026/programacion/Lunes
  @Get('programacion/:dia')
  obtenerDia(@Param('dia') dia: string) {
    return this.vinaService.getProgramacionPorDia(dia);
  }
}
