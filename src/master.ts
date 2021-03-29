import {
  NewSeriesCreated,
  OwnershipTransferred,
  ReceiveTokenFrom,
  SeriesFeeChanged,
  TokenAddrChanged,
  TokenWithdrawn
} from "../generated/MasterDelaware/MasterContract"
import { Master, Company } from "../generated/schema"
import { Company as CompanyTemplate } from "../generated/templates"
import { MASTER_DELAWARE, MASTER_WYOMING } from "./helpers"

export function handleNewSeriesCreated(event: NewSeriesCreated): void {

  let factory = Master.load(event.address.toHexString())
  if (factory === null) {
    factory = new Master(event.address.toHexString())
    factory.companiesCount = 0
    factory.companies = []
    if (event.address.toHexString() == MASTER_DELAWARE) factory.jurisdiction = 'DELAWARE'
    if (event.address.toHexString() == MASTER_WYOMING) factory.jurisdiction = 'WYOMING'
  }
  factory.companiesCount += 1
  factory.save()
  
  let newCompany = new Company(event.params._contract.toHexString())
  newCompany.creation = event.block.timestamp;
  newCompany.owner = event.params._owner
  newCompany.creator = event.params._owner
  newCompany.name = event.params._name
  newCompany.parent = factory.id
  newCompany.jurisdiction = factory.jurisdiction
  newCompany.save()
  CompanyTemplate.create(event.params._contract)

  factory.companies = factory.companies.concat([newCompany.id])
  factory.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleReceiveTokenFrom(event: ReceiveTokenFrom): void {}

export function handleSeriesFeeChanged(event: SeriesFeeChanged): void {}

export function handleTokenAddrChanged(event: TokenAddrChanged): void {}

export function handleTokenWithdrawn(event: TokenWithdrawn): void {}
