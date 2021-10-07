import { log } from '@graphprotocol/graph-ts'
import {
  OwnershipTransferred
} from "../generated/templates/Company/CompanyContract"
import { Company } from "../generated/schema"

export function handleSeriesOwnershipTransferred(event: OwnershipTransferred): void {

  let company = Company.load(event.address.toHexString())
  company.owner = event.params.newOwner
  company.modified = event.block.timestamp
  company.save()

}