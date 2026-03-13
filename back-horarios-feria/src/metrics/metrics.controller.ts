import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  /**
   * Endpoint público para obtener el total de estudiantes
   * No requiere autenticación
   */
  @Get('public/total-students')
  async getTotalStudents() {
    const total = await this.metricsService.getTotalStudents();
    return { totalStudents: total };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getGeneralMetrics() {
    return this.metricsService.getGeneralMetrics();
  }

  @Get('days')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getDayMetrics() {
    return this.metricsService.getDayMetrics();
  }

  @Get('slots')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getSlotMetrics() {
    return this.metricsService.getSlotMetrics();
  }
}
