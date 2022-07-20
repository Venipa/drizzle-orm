import { AnyTable } from 'drizzle-orm';
import { ColumnData, ColumnDriverParam, ColumnHasDefault, ColumnNotNull, TableName } from 'drizzle-orm/branded-types';

import { PgColumn, PgColumnBuilder } from './common';

export class PgJsonbBuilder<
	TData,
	TNotNull extends ColumnNotNull = ColumnNotNull<false>,
	THasDefault extends ColumnHasDefault = ColumnHasDefault<false>,
> extends PgColumnBuilder<ColumnData<TData>, ColumnDriverParam<string>, TNotNull, THasDefault> {
	constructor(name: string) {
		super(name);
	}

	/** @internal */
	override build<TTableName extends TableName>(
		table: AnyTable<TTableName>,
	): PgJsonb<TTableName, TNotNull, THasDefault, TData> {
		return new PgJsonb(table, this);
	}
}

export class PgJsonb<
	TTableName extends TableName,
	TNotNull extends ColumnNotNull,
	THasDefault extends ColumnHasDefault,
	TData,
> extends PgColumn<TTableName, ColumnData<TData>, ColumnDriverParam<string>, TNotNull, THasDefault> {
	constructor(table: AnyTable<TTableName>, builder: PgJsonbBuilder<TData, TNotNull, THasDefault>) {
		super(table, builder);
	}

	getSQLType(): string {
		return 'jsonb';
	}

	// TODO: map from driver value
	override mapFromDriverValue(value: ColumnDriverParam<string>): ColumnData<TData> {
		return value as ColumnData<any>;
	}
}

export function jsonb<TData = any>(name: string) {
	return new PgJsonbBuilder<TData>(name);
}

// const jsonColumn = jsonb<{ id: string }>('dbName');