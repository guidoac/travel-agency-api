import { Injectable } from '@nestjs/common';
import { Address } from './address.entity';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.createAddress(createAddressDto);
  }
}
