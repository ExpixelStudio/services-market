# services-market

Service discovery platform for small businesses.

# Setup

Installed Vendure backend using CLI : ```npx @vendure/create my-shop```

# Process

1. Added some custom fields to vendure-config for experimentation.

2. Created custom Vendor plugin, for vendors(sm businesses owners) to capture custom data for intended features.

   - `npx vendure add` command, and select "Create a new Vendure plugin".
     This will guide you through the creation of a new plugin and automate all aspects of the process.
     However i created plugins manually for better understanding/learning.

3. Add GraphQL support to the `VendorPlugin`
   This will allow you to:

   * Create vendors via a `createVendor` mutation
   * Fetch them using a `vendors` query
   * Prepare for later filtering (by distance, open status, etc.)

4.


# Learning

As it relates to **entities** in plugins.

Vendure uses **TypeORM** to manage entities.

* `@Entity()` registers the model in the DB
* `VendureEntity` gives you `createdAt`, `updatedAt` by default
* `@Column()` defines each DB column (with its type)
