# Otoco - Subgraph

This subgraph listens for the following smart contract events.

For Master Contract:

**NewSeriesCreated**(address,address,string)

For Series Contract:

**OwnershipTransferred**(indexed address,indexed address)

These events get save in to the following entities :
```yaml
enum JURISDICTION {
  DELAWARE,
  WYOMING
}

type Master @entity {
  id: ID! # Master jurisdiction contract
  companiesCount: Int! # How many companies has deployed on this jurisdiction
  companies: [Company]! # List of companies deployed on this jurisdiction
  jurisdiction: JURISDICTION! # Jurisdiction name
}

type Company @entity {
  id: ID! # Series contract address
  parent: Master! # Master contract where series reside
  name: String! # Series name
  jurisdiction: JURISDICTION! # Series Jurisdiction
  creator: Bytes! # Address of the creator of the series
  owner: Bytes! # Current owner address
}
```

To create graph, run `graph create moloch --node http://127.0.0.1:8020`

After updating subgraph or schema, run `yarn codegen`

To deploy locally, run `graph deploy jamesyoung/moloch --debug --ipfs http://localhost:5001/ --node http://127.0.0.1:8020`