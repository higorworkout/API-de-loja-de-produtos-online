import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProducts1720206596751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
                'orders_products',
                new TableColumn(
                  {
                      name: 'product_id',
                      type: 'uuid',
                      isNullable: true
                    })
              );

              await queryRunner.createForeignKey(
                'orders_products',
                new TableForeignKey({
                  name: 'OrdersProductsProduct',
                  columnNames: ['product_id'],
                  referencedTableName: 'products',
                  referencedColumnNames:  ['id'],
                  onDelete: 'SET NULL',
                })
              )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder')
      await queryRunner.dropColumn('orders_products', 'order_id');
    }

}
