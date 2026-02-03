import { Driver } from '../types/driver';
import { db } from '../../db/in-memory.db';
import { DriverInputDto } from '../dto/driver.input-dto';
import {Blog} from "../types/blog";


export const blogsRepository = {
  findAll(): Blog[] {
    return db.blogs;
  },

  findById(id: string): Blog | null {
    return db.blogs.find((b) => b.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },

  create(newBlog: Blog): Blog {
    db.blogs.push(newBlog);

    return newBlog;
  },

  update(id: number, dto: DriverInputDto): void {
    const driver = db.drivers.find((d) => d.id === id);

    if (!driver) {
      throw new Error('Driver not exist');
    }

    driver.name = dto.name;
    driver.phoneNumber = dto.phoneNumber;
    driver.email = dto.email;
    driver.vehicleMake = dto.vehicleMake;
    driver.vehicleModel = dto.vehicleModel;
    driver.vehicleYear = dto.vehicleYear;
    driver.vehicleLicensePlate = dto.vehicleLicensePlate;
    driver.vehicleDescription = dto.vehicleDescription;
    driver.vehicleFeatures = dto.vehicleFeatures;

    return;
  },

  delete(id: number): void {
    const index = db.drivers.findIndex((v) => v.id === id);

    if (index === -1) {
      throw new Error('Driver not exist');
    }

    db.drivers.splice(index, 1);
    return;
  },
};
