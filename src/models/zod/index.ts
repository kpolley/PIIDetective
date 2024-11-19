import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ColumnScalarFieldEnumSchema = z.enum(['id','name','tableName','datasetId']);

export const ColumnClassificationScalarFieldEnumSchema = z.enum(['id','columnId','classification','confidenceScore']);

export const PolicyTagDecisionScalarFieldEnumSchema = z.enum(['id','columnId','decision','decisionTimestamp']);

export const ScanStatusScalarFieldEnumSchema = z.enum(['id','status','scanStart','scanEnd']);

export const TableHistoryScalarFieldEnumSchema = z.enum(['id','tableName','datasetId','lastScanTimestamp']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ClassificationSchema = z.enum(['PersonName','PersonAddress','PersonPhoneNumber','SSN','PersonEmail','IPAddress']);

export type ClassificationType = `${z.infer<typeof ClassificationSchema>}`

export const ConfidenceScoreSchema = z.enum(['High','Medium','Low']);

export type ConfidenceScoreType = `${z.infer<typeof ConfidenceScoreSchema>}`

export const ScanStatusTypeSchema = z.enum(['InProgress','Completed','Failed']);

export type ScanStatusTypeType = `${z.infer<typeof ScanStatusTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COLUMN SCHEMA
/////////////////////////////////////////

export const ColumnSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string(),
})

export type Column = z.infer<typeof ColumnSchema>

/////////////////////////////////////////
// COLUMN CLASSIFICATION SCHEMA
/////////////////////////////////////////

export const ColumnClassificationSchema = z.object({
  classification: ClassificationSchema,
  confidenceScore: ConfidenceScoreSchema,
  id: z.number().int(),
  columnId: z.number().int(),
})

export type ColumnClassification = z.infer<typeof ColumnClassificationSchema>

/////////////////////////////////////////
// POLICY TAG DECISION SCHEMA
/////////////////////////////////////////

export const PolicyTagDecisionSchema = z.object({
  id: z.number().int(),
  columnId: z.number().int(),
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date(),
})

export type PolicyTagDecision = z.infer<typeof PolicyTagDecisionSchema>

/////////////////////////////////////////
// SCAN STATUS SCHEMA
/////////////////////////////////////////

export const ScanStatusSchema = z.object({
  status: ScanStatusTypeSchema,
  id: z.number().int(),
  scanStart: z.coerce.date(),
  scanEnd: z.coerce.date().nullable(),
})

export type ScanStatus = z.infer<typeof ScanStatusSchema>

/////////////////////////////////////////
// TABLE HISTORY SCHEMA
/////////////////////////////////////////

export const TableHistorySchema = z.object({
  id: z.number().int(),
  tableName: z.string(),
  datasetId: z.string(),
  lastScanTimestamp: z.coerce.date(),
})

export type TableHistory = z.infer<typeof TableHistorySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COLUMN
//------------------------------------------------------

export const ColumnIncludeSchema: z.ZodType<Prisma.ColumnInclude> = z.object({
  classifications: z.union([z.boolean(),z.lazy(() => ColumnClassificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ColumnArgsSchema: z.ZodType<Prisma.ColumnDefaultArgs> = z.object({
  select: z.lazy(() => ColumnSelectSchema).optional(),
  include: z.lazy(() => ColumnIncludeSchema).optional(),
}).strict();

export const ColumnCountOutputTypeArgsSchema: z.ZodType<Prisma.ColumnCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ColumnCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ColumnCountOutputTypeSelectSchema: z.ZodType<Prisma.ColumnCountOutputTypeSelect> = z.object({
  classifications: z.boolean().optional(),
}).strict();

export const ColumnSelectSchema: z.ZodType<Prisma.ColumnSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  tableName: z.boolean().optional(),
  datasetId: z.boolean().optional(),
  classifications: z.union([z.boolean(),z.lazy(() => ColumnClassificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COLUMN CLASSIFICATION
//------------------------------------------------------

export const ColumnClassificationIncludeSchema: z.ZodType<Prisma.ColumnClassificationInclude> = z.object({
  column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
  PolicyTagDecision: z.union([z.boolean(),z.lazy(() => PolicyTagDecisionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnClassificationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ColumnClassificationArgsSchema: z.ZodType<Prisma.ColumnClassificationDefaultArgs> = z.object({
  select: z.lazy(() => ColumnClassificationSelectSchema).optional(),
  include: z.lazy(() => ColumnClassificationIncludeSchema).optional(),
}).strict();

export const ColumnClassificationCountOutputTypeArgsSchema: z.ZodType<Prisma.ColumnClassificationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ColumnClassificationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ColumnClassificationCountOutputTypeSelectSchema: z.ZodType<Prisma.ColumnClassificationCountOutputTypeSelect> = z.object({
  PolicyTagDecision: z.boolean().optional(),
}).strict();

export const ColumnClassificationSelectSchema: z.ZodType<Prisma.ColumnClassificationSelect> = z.object({
  id: z.boolean().optional(),
  columnId: z.boolean().optional(),
  classification: z.boolean().optional(),
  confidenceScore: z.boolean().optional(),
  column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
  PolicyTagDecision: z.union([z.boolean(),z.lazy(() => PolicyTagDecisionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnClassificationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POLICY TAG DECISION
//------------------------------------------------------

export const PolicyTagDecisionIncludeSchema: z.ZodType<Prisma.PolicyTagDecisionInclude> = z.object({
  ColumnClassification: z.union([z.boolean(),z.lazy(() => ColumnClassificationArgsSchema)]).optional(),
}).strict()

export const PolicyTagDecisionArgsSchema: z.ZodType<Prisma.PolicyTagDecisionDefaultArgs> = z.object({
  select: z.lazy(() => PolicyTagDecisionSelectSchema).optional(),
  include: z.lazy(() => PolicyTagDecisionIncludeSchema).optional(),
}).strict();

export const PolicyTagDecisionSelectSchema: z.ZodType<Prisma.PolicyTagDecisionSelect> = z.object({
  id: z.boolean().optional(),
  columnId: z.boolean().optional(),
  decision: z.boolean().optional(),
  decisionTimestamp: z.boolean().optional(),
  ColumnClassification: z.union([z.boolean(),z.lazy(() => ColumnClassificationArgsSchema)]).optional(),
}).strict()

// SCAN STATUS
//------------------------------------------------------

export const ScanStatusSelectSchema: z.ZodType<Prisma.ScanStatusSelect> = z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  scanStart: z.boolean().optional(),
  scanEnd: z.boolean().optional(),
}).strict()

// TABLE HISTORY
//------------------------------------------------------

export const TableHistorySelectSchema: z.ZodType<Prisma.TableHistorySelect> = z.object({
  id: z.boolean().optional(),
  tableName: z.boolean().optional(),
  datasetId: z.boolean().optional(),
  lastScanTimestamp: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ColumnWhereInputSchema: z.ZodType<Prisma.ColumnWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tableName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  classifications: z.lazy(() => ColumnClassificationListRelationFilterSchema).optional()
}).strict();

export const ColumnOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  classifications: z.lazy(() => ColumnClassificationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ColumnWhereUniqueInputSchema: z.ZodType<Prisma.ColumnWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name_tableName_datasetId: z.lazy(() => ColumnNameTableNameDatasetIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name_tableName_datasetId: z.lazy(() => ColumnNameTableNameDatasetIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name_tableName_datasetId: z.lazy(() => ColumnNameTableNameDatasetIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema),z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tableName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  classifications: z.lazy(() => ColumnClassificationListRelationFilterSchema).optional()
}).strict());

export const ColumnOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ColumnAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ColumnSumOrderByAggregateInputSchema).optional()
}).strict();

export const ColumnScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tableName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ColumnClassificationWhereInputSchema: z.ZodType<Prisma.ColumnClassificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnClassificationWhereInputSchema),z.lazy(() => ColumnClassificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnClassificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnClassificationWhereInputSchema),z.lazy(() => ColumnClassificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  classification: z.union([ z.lazy(() => EnumClassificationFilterSchema),z.lazy(() => ClassificationSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => EnumConfidenceScoreFilterSchema),z.lazy(() => ConfidenceScoreSchema) ]).optional(),
  column: z.union([ z.lazy(() => ColumnRelationFilterSchema),z.lazy(() => ColumnWhereInputSchema) ]).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionListRelationFilterSchema).optional()
}).strict();

export const ColumnClassificationOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnClassificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  confidenceScore: z.lazy(() => SortOrderSchema).optional(),
  column: z.lazy(() => ColumnOrderByWithRelationInputSchema).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ColumnClassificationWhereUniqueInputSchema: z.ZodType<Prisma.ColumnClassificationWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    columnId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    columnId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  columnId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ColumnClassificationWhereInputSchema),z.lazy(() => ColumnClassificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnClassificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnClassificationWhereInputSchema),z.lazy(() => ColumnClassificationWhereInputSchema).array() ]).optional(),
  classification: z.union([ z.lazy(() => EnumClassificationFilterSchema),z.lazy(() => ClassificationSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => EnumConfidenceScoreFilterSchema),z.lazy(() => ConfidenceScoreSchema) ]).optional(),
  column: z.union([ z.lazy(() => ColumnRelationFilterSchema),z.lazy(() => ColumnWhereInputSchema) ]).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionListRelationFilterSchema).optional()
}).strict());

export const ColumnClassificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnClassificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  confidenceScore: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnClassificationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ColumnClassificationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnClassificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnClassificationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ColumnClassificationSumOrderByAggregateInputSchema).optional()
}).strict();

export const ColumnClassificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnClassificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnClassificationScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnClassificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnClassificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnClassificationScalarWhereWithAggregatesInputSchema),z.lazy(() => ColumnClassificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  classification: z.union([ z.lazy(() => EnumClassificationWithAggregatesFilterSchema),z.lazy(() => ClassificationSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => EnumConfidenceScoreWithAggregatesFilterSchema),z.lazy(() => ConfidenceScoreSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionWhereInputSchema: z.ZodType<Prisma.PolicyTagDecisionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PolicyTagDecisionWhereInputSchema),z.lazy(() => PolicyTagDecisionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PolicyTagDecisionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PolicyTagDecisionWhereInputSchema),z.lazy(() => PolicyTagDecisionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  decision: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  decisionTimestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ColumnClassification: z.union([ z.lazy(() => ColumnClassificationRelationFilterSchema),z.lazy(() => ColumnClassificationWhereInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionOrderByWithRelationInputSchema: z.ZodType<Prisma.PolicyTagDecisionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionTimestamp: z.lazy(() => SortOrderSchema).optional(),
  ColumnClassification: z.lazy(() => ColumnClassificationOrderByWithRelationInputSchema).optional()
}).strict();

export const PolicyTagDecisionWhereUniqueInputSchema: z.ZodType<Prisma.PolicyTagDecisionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PolicyTagDecisionWhereInputSchema),z.lazy(() => PolicyTagDecisionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PolicyTagDecisionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PolicyTagDecisionWhereInputSchema),z.lazy(() => PolicyTagDecisionWhereInputSchema).array() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  decision: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  decisionTimestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ColumnClassification: z.union([ z.lazy(() => ColumnClassificationRelationFilterSchema),z.lazy(() => ColumnClassificationWhereInputSchema) ]).optional(),
}).strict());

export const PolicyTagDecisionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PolicyTagDecisionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionTimestamp: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PolicyTagDecisionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PolicyTagDecisionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PolicyTagDecisionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PolicyTagDecisionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PolicyTagDecisionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PolicyTagDecisionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PolicyTagDecisionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PolicyTagDecisionScalarWhereWithAggregatesInputSchema),z.lazy(() => PolicyTagDecisionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PolicyTagDecisionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PolicyTagDecisionScalarWhereWithAggregatesInputSchema),z.lazy(() => PolicyTagDecisionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  decision: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  decisionTimestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ScanStatusWhereInputSchema: z.ZodType<Prisma.ScanStatusWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScanStatusWhereInputSchema),z.lazy(() => ScanStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScanStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScanStatusWhereInputSchema),z.lazy(() => ScanStatusWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumScanStatusTypeFilterSchema),z.lazy(() => ScanStatusTypeSchema) ]).optional(),
  scanStart: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scanEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ScanStatusOrderByWithRelationInputSchema: z.ZodType<Prisma.ScanStatusOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  scanStart: z.lazy(() => SortOrderSchema).optional(),
  scanEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const ScanStatusWhereUniqueInputSchema: z.ZodType<Prisma.ScanStatusWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ScanStatusWhereInputSchema),z.lazy(() => ScanStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScanStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScanStatusWhereInputSchema),z.lazy(() => ScanStatusWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumScanStatusTypeFilterSchema),z.lazy(() => ScanStatusTypeSchema) ]).optional(),
  scanStart: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scanEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const ScanStatusOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScanStatusOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  scanStart: z.lazy(() => SortOrderSchema).optional(),
  scanEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ScanStatusCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ScanStatusAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScanStatusMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScanStatusMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ScanStatusSumOrderByAggregateInputSchema).optional()
}).strict();

export const ScanStatusScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScanStatusScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScanStatusScalarWhereWithAggregatesInputSchema),z.lazy(() => ScanStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScanStatusScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScanStatusScalarWhereWithAggregatesInputSchema),z.lazy(() => ScanStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumScanStatusTypeWithAggregatesFilterSchema),z.lazy(() => ScanStatusTypeSchema) ]).optional(),
  scanStart: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  scanEnd: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const TableHistoryWhereInputSchema: z.ZodType<Prisma.TableHistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TableHistoryWhereInputSchema),z.lazy(() => TableHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TableHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TableHistoryWhereInputSchema),z.lazy(() => TableHistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tableName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastScanTimestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TableHistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.TableHistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  lastScanTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TableHistoryWhereUniqueInputSchema: z.ZodType<Prisma.TableHistoryWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    tableName_datasetId: z.lazy(() => TableHistoryTableNameDatasetIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    tableName_datasetId: z.lazy(() => TableHistoryTableNameDatasetIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  tableName_datasetId: z.lazy(() => TableHistoryTableNameDatasetIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TableHistoryWhereInputSchema),z.lazy(() => TableHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TableHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TableHistoryWhereInputSchema),z.lazy(() => TableHistoryWhereInputSchema).array() ]).optional(),
  tableName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastScanTimestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const TableHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.TableHistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  lastScanTimestamp: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TableHistoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TableHistoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TableHistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TableHistoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TableHistorySumOrderByAggregateInputSchema).optional()
}).strict();

export const TableHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TableHistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TableHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => TableHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TableHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TableHistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => TableHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tableName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  datasetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastScanTimestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ColumnCreateInputSchema: z.ZodType<Prisma.ColumnCreateInput> = z.object({
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string(),
  classifications: z.lazy(() => ColumnClassificationCreateNestedManyWithoutColumnInputSchema).optional()
}).strict();

export const ColumnUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string(),
  classifications: z.lazy(() => ColumnClassificationUncheckedCreateNestedManyWithoutColumnInputSchema).optional()
}).strict();

export const ColumnUpdateInputSchema: z.ZodType<Prisma.ColumnUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classifications: z.lazy(() => ColumnClassificationUpdateManyWithoutColumnNestedInputSchema).optional()
}).strict();

export const ColumnUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classifications: z.lazy(() => ColumnClassificationUncheckedUpdateManyWithoutColumnNestedInputSchema).optional()
}).strict();

export const ColumnCreateManyInputSchema: z.ZodType<Prisma.ColumnCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string()
}).strict();

export const ColumnUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnClassificationCreateInputSchema: z.ZodType<Prisma.ColumnClassificationCreateInput> = z.object({
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema),
  column: z.lazy(() => ColumnCreateNestedOneWithoutClassificationsInputSchema),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionCreateNestedManyWithoutColumnClassificationInputSchema).optional()
}).strict();

export const ColumnClassificationUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  columnId: z.number().int(),
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionUncheckedCreateNestedManyWithoutColumnClassificationInputSchema).optional()
}).strict();

export const ColumnClassificationUpdateInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateInput> = z.object({
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
  column: z.lazy(() => ColumnUpdateOneRequiredWithoutClassificationsNestedInputSchema).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionUpdateManyWithoutColumnClassificationNestedInputSchema).optional()
}).strict();

export const ColumnClassificationUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationNestedInputSchema).optional()
}).strict();

export const ColumnClassificationCreateManyInputSchema: z.ZodType<Prisma.ColumnClassificationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  columnId: z.number().int(),
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema)
}).strict();

export const ColumnClassificationUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateManyMutationInput> = z.object({
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnClassificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionCreateInputSchema: z.ZodType<Prisma.PolicyTagDecisionCreateInput> = z.object({
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date().optional(),
  ColumnClassification: z.lazy(() => ColumnClassificationCreateNestedOneWithoutPolicyTagDecisionInputSchema)
}).strict();

export const PolicyTagDecisionUncheckedCreateInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  columnId: z.number().int(),
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date().optional()
}).strict();

export const PolicyTagDecisionUpdateInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateInput> = z.object({
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ColumnClassification: z.lazy(() => ColumnClassificationUpdateOneRequiredWithoutPolicyTagDecisionNestedInputSchema).optional()
}).strict();

export const PolicyTagDecisionUncheckedUpdateInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionCreateManyInputSchema: z.ZodType<Prisma.PolicyTagDecisionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  columnId: z.number().int(),
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date().optional()
}).strict();

export const PolicyTagDecisionUpdateManyMutationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateManyMutationInput> = z.object({
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScanStatusCreateInputSchema: z.ZodType<Prisma.ScanStatusCreateInput> = z.object({
  status: z.lazy(() => ScanStatusTypeSchema),
  scanStart: z.coerce.date().optional(),
  scanEnd: z.coerce.date().optional().nullable()
}).strict();

export const ScanStatusUncheckedCreateInputSchema: z.ZodType<Prisma.ScanStatusUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  status: z.lazy(() => ScanStatusTypeSchema),
  scanStart: z.coerce.date().optional(),
  scanEnd: z.coerce.date().optional().nullable()
}).strict();

export const ScanStatusUpdateInputSchema: z.ZodType<Prisma.ScanStatusUpdateInput> = z.object({
  status: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => EnumScanStatusTypeFieldUpdateOperationsInputSchema) ]).optional(),
  scanStart: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScanStatusUncheckedUpdateInputSchema: z.ZodType<Prisma.ScanStatusUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => EnumScanStatusTypeFieldUpdateOperationsInputSchema) ]).optional(),
  scanStart: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScanStatusCreateManyInputSchema: z.ZodType<Prisma.ScanStatusCreateManyInput> = z.object({
  id: z.number().int().optional(),
  status: z.lazy(() => ScanStatusTypeSchema),
  scanStart: z.coerce.date().optional(),
  scanEnd: z.coerce.date().optional().nullable()
}).strict();

export const ScanStatusUpdateManyMutationInputSchema: z.ZodType<Prisma.ScanStatusUpdateManyMutationInput> = z.object({
  status: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => EnumScanStatusTypeFieldUpdateOperationsInputSchema) ]).optional(),
  scanStart: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScanStatusUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScanStatusUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => EnumScanStatusTypeFieldUpdateOperationsInputSchema) ]).optional(),
  scanStart: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanEnd: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TableHistoryCreateInputSchema: z.ZodType<Prisma.TableHistoryCreateInput> = z.object({
  tableName: z.string(),
  datasetId: z.string(),
  lastScanTimestamp: z.coerce.date()
}).strict();

export const TableHistoryUncheckedCreateInputSchema: z.ZodType<Prisma.TableHistoryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  tableName: z.string(),
  datasetId: z.string(),
  lastScanTimestamp: z.coerce.date()
}).strict();

export const TableHistoryUpdateInputSchema: z.ZodType<Prisma.TableHistoryUpdateInput> = z.object({
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastScanTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TableHistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.TableHistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastScanTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TableHistoryCreateManyInputSchema: z.ZodType<Prisma.TableHistoryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  tableName: z.string(),
  datasetId: z.string(),
  lastScanTimestamp: z.coerce.date()
}).strict();

export const TableHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.TableHistoryUpdateManyMutationInput> = z.object({
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastScanTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TableHistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TableHistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastScanTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const ColumnClassificationListRelationFilterSchema: z.ZodType<Prisma.ColumnClassificationListRelationFilter> = z.object({
  every: z.lazy(() => ColumnClassificationWhereInputSchema).optional(),
  some: z.lazy(() => ColumnClassificationWhereInputSchema).optional(),
  none: z.lazy(() => ColumnClassificationWhereInputSchema).optional()
}).strict();

export const ColumnClassificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ColumnClassificationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnNameTableNameDatasetIdCompoundUniqueInputSchema: z.ZodType<Prisma.ColumnNameTableNameDatasetIdCompoundUniqueInput> = z.object({
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string()
}).strict();

export const ColumnCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnSumOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumClassificationFilterSchema: z.ZodType<Prisma.EnumClassificationFilter> = z.object({
  equals: z.lazy(() => ClassificationSchema).optional(),
  in: z.lazy(() => ClassificationSchema).array().optional(),
  notIn: z.lazy(() => ClassificationSchema).array().optional(),
  not: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => NestedEnumClassificationFilterSchema) ]).optional(),
}).strict();

export const EnumConfidenceScoreFilterSchema: z.ZodType<Prisma.EnumConfidenceScoreFilter> = z.object({
  equals: z.lazy(() => ConfidenceScoreSchema).optional(),
  in: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  notIn: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  not: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => NestedEnumConfidenceScoreFilterSchema) ]).optional(),
}).strict();

export const ColumnRelationFilterSchema: z.ZodType<Prisma.ColumnRelationFilter> = z.object({
  is: z.lazy(() => ColumnWhereInputSchema).optional(),
  isNot: z.lazy(() => ColumnWhereInputSchema).optional()
}).strict();

export const PolicyTagDecisionListRelationFilterSchema: z.ZodType<Prisma.PolicyTagDecisionListRelationFilter> = z.object({
  every: z.lazy(() => PolicyTagDecisionWhereInputSchema).optional(),
  some: z.lazy(() => PolicyTagDecisionWhereInputSchema).optional(),
  none: z.lazy(() => PolicyTagDecisionWhereInputSchema).optional()
}).strict();

export const PolicyTagDecisionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PolicyTagDecisionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnClassificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnClassificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  confidenceScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnClassificationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnClassificationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnClassificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnClassificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  confidenceScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnClassificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnClassificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  confidenceScore: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnClassificationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnClassificationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumClassificationWithAggregatesFilterSchema: z.ZodType<Prisma.EnumClassificationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ClassificationSchema).optional(),
  in: z.lazy(() => ClassificationSchema).array().optional(),
  notIn: z.lazy(() => ClassificationSchema).array().optional(),
  not: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => NestedEnumClassificationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumClassificationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumClassificationFilterSchema).optional()
}).strict();

export const EnumConfidenceScoreWithAggregatesFilterSchema: z.ZodType<Prisma.EnumConfidenceScoreWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConfidenceScoreSchema).optional(),
  in: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  notIn: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  not: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => NestedEnumConfidenceScoreWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConfidenceScoreFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConfidenceScoreFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ColumnClassificationRelationFilterSchema: z.ZodType<Prisma.ColumnClassificationRelationFilter> = z.object({
  is: z.lazy(() => ColumnClassificationWhereInputSchema).optional(),
  isNot: z.lazy(() => ColumnClassificationWhereInputSchema).optional()
}).strict();

export const PolicyTagDecisionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PolicyTagDecisionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PolicyTagDecisionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PolicyTagDecisionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PolicyTagDecisionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PolicyTagDecisionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PolicyTagDecisionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PolicyTagDecisionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PolicyTagDecisionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PolicyTagDecisionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumScanStatusTypeFilterSchema: z.ZodType<Prisma.EnumScanStatusTypeFilter> = z.object({
  equals: z.lazy(() => ScanStatusTypeSchema).optional(),
  in: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  notIn: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => NestedEnumScanStatusTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ScanStatusCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScanStatusCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  scanStart: z.lazy(() => SortOrderSchema).optional(),
  scanEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScanStatusAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScanStatusAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScanStatusMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScanStatusMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  scanStart: z.lazy(() => SortOrderSchema).optional(),
  scanEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScanStatusMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScanStatusMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  scanStart: z.lazy(() => SortOrderSchema).optional(),
  scanEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScanStatusSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScanStatusSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumScanStatusTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumScanStatusTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ScanStatusTypeSchema).optional(),
  in: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  notIn: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => NestedEnumScanStatusTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumScanStatusTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumScanStatusTypeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const TableHistoryTableNameDatasetIdCompoundUniqueInputSchema: z.ZodType<Prisma.TableHistoryTableNameDatasetIdCompoundUniqueInput> = z.object({
  tableName: z.string(),
  datasetId: z.string()
}).strict();

export const TableHistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.TableHistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  lastScanTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TableHistoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TableHistoryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TableHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TableHistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  lastScanTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TableHistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.TableHistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tableName: z.lazy(() => SortOrderSchema).optional(),
  datasetId: z.lazy(() => SortOrderSchema).optional(),
  lastScanTimestamp: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TableHistorySumOrderByAggregateInputSchema: z.ZodType<Prisma.TableHistorySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ColumnClassificationCreateNestedManyWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationCreateNestedManyWithoutColumnInput> = z.object({
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema).array(),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnClassificationCreateManyColumnInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ColumnClassificationUncheckedCreateNestedManyWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedCreateNestedManyWithoutColumnInput> = z.object({
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema).array(),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnClassificationCreateManyColumnInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const ColumnClassificationUpdateManyWithoutColumnNestedInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateManyWithoutColumnNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema).array(),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnClassificationUpsertWithWhereUniqueWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUpsertWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnClassificationCreateManyColumnInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnClassificationUpdateWithWhereUniqueWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUpdateWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnClassificationUpdateManyWithWhereWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUpdateManyWithWhereWithoutColumnInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnClassificationScalarWhereInputSchema),z.lazy(() => ColumnClassificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ColumnClassificationUncheckedUpdateManyWithoutColumnNestedInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedUpdateManyWithoutColumnNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema).array(),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema),z.lazy(() => ColumnClassificationCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnClassificationUpsertWithWhereUniqueWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUpsertWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnClassificationCreateManyColumnInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnClassificationWhereUniqueInputSchema),z.lazy(() => ColumnClassificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnClassificationUpdateWithWhereUniqueWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUpdateWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnClassificationUpdateManyWithWhereWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUpdateManyWithWhereWithoutColumnInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnClassificationScalarWhereInputSchema),z.lazy(() => ColumnClassificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnCreateNestedOneWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnCreateNestedOneWithoutClassificationsInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutClassificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutClassificationsInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional()
}).strict();

export const PolicyTagDecisionCreateNestedManyWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionCreateNestedManyWithoutColumnClassificationInput> = z.object({
  create: z.union([ z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema).array(),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PolicyTagDecisionCreateManyColumnClassificationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PolicyTagDecisionUncheckedCreateNestedManyWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedCreateNestedManyWithoutColumnClassificationInput> = z.object({
  create: z.union([ z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema).array(),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PolicyTagDecisionCreateManyColumnClassificationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumClassificationFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumClassificationFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ClassificationSchema).optional()
}).strict();

export const EnumConfidenceScoreFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumConfidenceScoreFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ConfidenceScoreSchema).optional()
}).strict();

export const ColumnUpdateOneRequiredWithoutClassificationsNestedInputSchema: z.ZodType<Prisma.ColumnUpdateOneRequiredWithoutClassificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnCreateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutClassificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutClassificationsInputSchema).optional(),
  upsert: z.lazy(() => ColumnUpsertWithoutClassificationsInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateToOneWithWhereWithoutClassificationsInputSchema),z.lazy(() => ColumnUpdateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutClassificationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionUpdateManyWithoutColumnClassificationNestedInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateManyWithoutColumnClassificationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema).array(),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PolicyTagDecisionUpsertWithWhereUniqueWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUpsertWithWhereUniqueWithoutColumnClassificationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PolicyTagDecisionCreateManyColumnClassificationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PolicyTagDecisionUpdateWithWhereUniqueWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUpdateWithWhereUniqueWithoutColumnClassificationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PolicyTagDecisionUpdateManyWithWhereWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUpdateManyWithWhereWithoutColumnClassificationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PolicyTagDecisionScalarWhereInputSchema),z.lazy(() => PolicyTagDecisionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationNestedInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema).array(),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PolicyTagDecisionUpsertWithWhereUniqueWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUpsertWithWhereUniqueWithoutColumnClassificationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PolicyTagDecisionCreateManyColumnClassificationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PolicyTagDecisionUpdateWithWhereUniqueWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUpdateWithWhereUniqueWithoutColumnClassificationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PolicyTagDecisionUpdateManyWithWhereWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUpdateManyWithWhereWithoutColumnClassificationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PolicyTagDecisionScalarWhereInputSchema),z.lazy(() => PolicyTagDecisionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ColumnClassificationCreateNestedOneWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationCreateNestedOneWithoutPolicyTagDecisionInput> = z.object({
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutPolicyTagDecisionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnClassificationCreateOrConnectWithoutPolicyTagDecisionInputSchema).optional(),
  connect: z.lazy(() => ColumnClassificationWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ColumnClassificationUpdateOneRequiredWithoutPolicyTagDecisionNestedInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateOneRequiredWithoutPolicyTagDecisionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutPolicyTagDecisionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnClassificationCreateOrConnectWithoutPolicyTagDecisionInputSchema).optional(),
  upsert: z.lazy(() => ColumnClassificationUpsertWithoutPolicyTagDecisionInputSchema).optional(),
  connect: z.lazy(() => ColumnClassificationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnClassificationUpdateToOneWithWhereWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUpdateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedUpdateWithoutPolicyTagDecisionInputSchema) ]).optional(),
}).strict();

export const EnumScanStatusTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumScanStatusTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ScanStatusTypeSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumClassificationFilterSchema: z.ZodType<Prisma.NestedEnumClassificationFilter> = z.object({
  equals: z.lazy(() => ClassificationSchema).optional(),
  in: z.lazy(() => ClassificationSchema).array().optional(),
  notIn: z.lazy(() => ClassificationSchema).array().optional(),
  not: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => NestedEnumClassificationFilterSchema) ]).optional(),
}).strict();

export const NestedEnumConfidenceScoreFilterSchema: z.ZodType<Prisma.NestedEnumConfidenceScoreFilter> = z.object({
  equals: z.lazy(() => ConfidenceScoreSchema).optional(),
  in: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  notIn: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  not: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => NestedEnumConfidenceScoreFilterSchema) ]).optional(),
}).strict();

export const NestedEnumClassificationWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumClassificationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ClassificationSchema).optional(),
  in: z.lazy(() => ClassificationSchema).array().optional(),
  notIn: z.lazy(() => ClassificationSchema).array().optional(),
  not: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => NestedEnumClassificationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumClassificationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumClassificationFilterSchema).optional()
}).strict();

export const NestedEnumConfidenceScoreWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumConfidenceScoreWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ConfidenceScoreSchema).optional(),
  in: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  notIn: z.lazy(() => ConfidenceScoreSchema).array().optional(),
  not: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => NestedEnumConfidenceScoreWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumConfidenceScoreFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumConfidenceScoreFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumScanStatusTypeFilterSchema: z.ZodType<Prisma.NestedEnumScanStatusTypeFilter> = z.object({
  equals: z.lazy(() => ScanStatusTypeSchema).optional(),
  in: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  notIn: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => NestedEnumScanStatusTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumScanStatusTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumScanStatusTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ScanStatusTypeSchema).optional(),
  in: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  notIn: z.lazy(() => ScanStatusTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ScanStatusTypeSchema),z.lazy(() => NestedEnumScanStatusTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumScanStatusTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumScanStatusTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ColumnClassificationCreateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationCreateWithoutColumnInput> = z.object({
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionCreateNestedManyWithoutColumnClassificationInputSchema).optional()
}).strict();

export const ColumnClassificationUncheckedCreateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedCreateWithoutColumnInput> = z.object({
  id: z.number().int().optional(),
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionUncheckedCreateNestedManyWithoutColumnClassificationInputSchema).optional()
}).strict();

export const ColumnClassificationCreateOrConnectWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationCreateOrConnectWithoutColumnInput> = z.object({
  where: z.lazy(() => ColumnClassificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema) ]),
}).strict();

export const ColumnClassificationCreateManyColumnInputEnvelopeSchema: z.ZodType<Prisma.ColumnClassificationCreateManyColumnInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ColumnClassificationCreateManyColumnInputSchema),z.lazy(() => ColumnClassificationCreateManyColumnInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ColumnClassificationUpsertWithWhereUniqueWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUpsertWithWhereUniqueWithoutColumnInput> = z.object({
  where: z.lazy(() => ColumnClassificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ColumnClassificationUpdateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedUpdateWithoutColumnInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutColumnInputSchema) ]),
}).strict();

export const ColumnClassificationUpdateWithWhereUniqueWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateWithWhereUniqueWithoutColumnInput> = z.object({
  where: z.lazy(() => ColumnClassificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ColumnClassificationUpdateWithoutColumnInputSchema),z.lazy(() => ColumnClassificationUncheckedUpdateWithoutColumnInputSchema) ]),
}).strict();

export const ColumnClassificationUpdateManyWithWhereWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateManyWithWhereWithoutColumnInput> = z.object({
  where: z.lazy(() => ColumnClassificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ColumnClassificationUpdateManyMutationInputSchema),z.lazy(() => ColumnClassificationUncheckedUpdateManyWithoutColumnInputSchema) ]),
}).strict();

export const ColumnClassificationScalarWhereInputSchema: z.ZodType<Prisma.ColumnClassificationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ColumnClassificationScalarWhereInputSchema),z.lazy(() => ColumnClassificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnClassificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnClassificationScalarWhereInputSchema),z.lazy(() => ColumnClassificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  classification: z.union([ z.lazy(() => EnumClassificationFilterSchema),z.lazy(() => ClassificationSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => EnumConfidenceScoreFilterSchema),z.lazy(() => ConfidenceScoreSchema) ]).optional(),
}).strict();

export const ColumnCreateWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnCreateWithoutClassificationsInput> = z.object({
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string()
}).strict();

export const ColumnUncheckedCreateWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutClassificationsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  tableName: z.string(),
  datasetId: z.string()
}).strict();

export const ColumnCreateOrConnectWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnCreateOrConnectWithoutClassificationsInput> = z.object({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnCreateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutClassificationsInputSchema) ]),
}).strict();

export const PolicyTagDecisionCreateWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionCreateWithoutColumnClassificationInput> = z.object({
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date().optional()
}).strict();

export const PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInput> = z.object({
  id: z.number().int().optional(),
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date().optional()
}).strict();

export const PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionCreateOrConnectWithoutColumnClassificationInput> = z.object({
  where: z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema) ]),
}).strict();

export const PolicyTagDecisionCreateManyColumnClassificationInputEnvelopeSchema: z.ZodType<Prisma.PolicyTagDecisionCreateManyColumnClassificationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PolicyTagDecisionCreateManyColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionCreateManyColumnClassificationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ColumnUpsertWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnUpsertWithoutClassificationsInput> = z.object({
  update: z.union([ z.lazy(() => ColumnUpdateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutClassificationsInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnCreateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedCreateWithoutClassificationsInputSchema) ]),
  where: z.lazy(() => ColumnWhereInputSchema).optional()
}).strict();

export const ColumnUpdateToOneWithWhereWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnUpdateToOneWithWhereWithoutClassificationsInput> = z.object({
  where: z.lazy(() => ColumnWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColumnUpdateWithoutClassificationsInputSchema),z.lazy(() => ColumnUncheckedUpdateWithoutClassificationsInputSchema) ]),
}).strict();

export const ColumnUpdateWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnUpdateWithoutClassificationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnUncheckedUpdateWithoutClassificationsInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateWithoutClassificationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tableName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datasetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionUpsertWithWhereUniqueWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpsertWithWhereUniqueWithoutColumnClassificationInput> = z.object({
  where: z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PolicyTagDecisionUpdateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedUpdateWithoutColumnClassificationInputSchema) ]),
  create: z.union([ z.lazy(() => PolicyTagDecisionCreateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedCreateWithoutColumnClassificationInputSchema) ]),
}).strict();

export const PolicyTagDecisionUpdateWithWhereUniqueWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateWithWhereUniqueWithoutColumnClassificationInput> = z.object({
  where: z.lazy(() => PolicyTagDecisionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PolicyTagDecisionUpdateWithoutColumnClassificationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedUpdateWithoutColumnClassificationInputSchema) ]),
}).strict();

export const PolicyTagDecisionUpdateManyWithWhereWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateManyWithWhereWithoutColumnClassificationInput> = z.object({
  where: z.lazy(() => PolicyTagDecisionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PolicyTagDecisionUpdateManyMutationInputSchema),z.lazy(() => PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationInputSchema) ]),
}).strict();

export const PolicyTagDecisionScalarWhereInputSchema: z.ZodType<Prisma.PolicyTagDecisionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PolicyTagDecisionScalarWhereInputSchema),z.lazy(() => PolicyTagDecisionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PolicyTagDecisionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PolicyTagDecisionScalarWhereInputSchema),z.lazy(() => PolicyTagDecisionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  decision: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  decisionTimestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ColumnClassificationCreateWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationCreateWithoutPolicyTagDecisionInput> = z.object({
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema),
  column: z.lazy(() => ColumnCreateNestedOneWithoutClassificationsInputSchema)
}).strict();

export const ColumnClassificationUncheckedCreateWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedCreateWithoutPolicyTagDecisionInput> = z.object({
  id: z.number().int().optional(),
  columnId: z.number().int(),
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema)
}).strict();

export const ColumnClassificationCreateOrConnectWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationCreateOrConnectWithoutPolicyTagDecisionInput> = z.object({
  where: z.lazy(() => ColumnClassificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutPolicyTagDecisionInputSchema) ]),
}).strict();

export const ColumnClassificationUpsertWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationUpsertWithoutPolicyTagDecisionInput> = z.object({
  update: z.union([ z.lazy(() => ColumnClassificationUpdateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedUpdateWithoutPolicyTagDecisionInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnClassificationCreateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedCreateWithoutPolicyTagDecisionInputSchema) ]),
  where: z.lazy(() => ColumnClassificationWhereInputSchema).optional()
}).strict();

export const ColumnClassificationUpdateToOneWithWhereWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateToOneWithWhereWithoutPolicyTagDecisionInput> = z.object({
  where: z.lazy(() => ColumnClassificationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColumnClassificationUpdateWithoutPolicyTagDecisionInputSchema),z.lazy(() => ColumnClassificationUncheckedUpdateWithoutPolicyTagDecisionInputSchema) ]),
}).strict();

export const ColumnClassificationUpdateWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateWithoutPolicyTagDecisionInput> = z.object({
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
  column: z.lazy(() => ColumnUpdateOneRequiredWithoutClassificationsNestedInputSchema).optional()
}).strict();

export const ColumnClassificationUncheckedUpdateWithoutPolicyTagDecisionInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedUpdateWithoutPolicyTagDecisionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ColumnClassificationCreateManyColumnInputSchema: z.ZodType<Prisma.ColumnClassificationCreateManyColumnInput> = z.object({
  id: z.number().int().optional(),
  classification: z.lazy(() => ClassificationSchema),
  confidenceScore: z.lazy(() => ConfidenceScoreSchema)
}).strict();

export const ColumnClassificationUpdateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUpdateWithoutColumnInput> = z.object({
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionUpdateManyWithoutColumnClassificationNestedInputSchema).optional()
}).strict();

export const ColumnClassificationUncheckedUpdateWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedUpdateWithoutColumnInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
  PolicyTagDecision: z.lazy(() => PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationNestedInputSchema).optional()
}).strict();

export const ColumnClassificationUncheckedUpdateManyWithoutColumnInputSchema: z.ZodType<Prisma.ColumnClassificationUncheckedUpdateManyWithoutColumnInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => ClassificationSchema),z.lazy(() => EnumClassificationFieldUpdateOperationsInputSchema) ]).optional(),
  confidenceScore: z.union([ z.lazy(() => ConfidenceScoreSchema),z.lazy(() => EnumConfidenceScoreFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionCreateManyColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionCreateManyColumnClassificationInput> = z.object({
  id: z.number().int().optional(),
  decision: z.boolean(),
  decisionTimestamp: z.coerce.date().optional()
}).strict();

export const PolicyTagDecisionUpdateWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateWithoutColumnClassificationInput> = z.object({
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionUncheckedUpdateWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedUpdateWithoutColumnClassificationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationInputSchema: z.ZodType<Prisma.PolicyTagDecisionUncheckedUpdateManyWithoutColumnClassificationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  decisionTimestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ColumnFindFirstArgsSchema: z.ZodType<Prisma.ColumnFindFirstArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema,ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColumnFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnFindFirstOrThrowArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema,ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColumnFindManyArgsSchema: z.ZodType<Prisma.ColumnFindManyArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema,ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColumnAggregateArgsSchema: z.ZodType<Prisma.ColumnAggregateArgs> = z.object({
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(),ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ColumnGroupByArgsSchema: z.ZodType<Prisma.ColumnGroupByArgs> = z.object({
  where: ColumnWhereInputSchema.optional(),
  orderBy: z.union([ ColumnOrderByWithAggregationInputSchema.array(),ColumnOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnScalarFieldEnumSchema.array(),
  having: ColumnScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ColumnFindUniqueArgsSchema: z.ZodType<Prisma.ColumnFindUniqueArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
}).strict() ;

export const ColumnFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnFindUniqueOrThrowArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
}).strict() ;

export const ColumnClassificationFindFirstArgsSchema: z.ZodType<Prisma.ColumnClassificationFindFirstArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereInputSchema.optional(),
  orderBy: z.union([ ColumnClassificationOrderByWithRelationInputSchema.array(),ColumnClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnClassificationScalarFieldEnumSchema,ColumnClassificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColumnClassificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnClassificationFindFirstOrThrowArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereInputSchema.optional(),
  orderBy: z.union([ ColumnClassificationOrderByWithRelationInputSchema.array(),ColumnClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnClassificationScalarFieldEnumSchema,ColumnClassificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColumnClassificationFindManyArgsSchema: z.ZodType<Prisma.ColumnClassificationFindManyArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereInputSchema.optional(),
  orderBy: z.union([ ColumnClassificationOrderByWithRelationInputSchema.array(),ColumnClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnClassificationScalarFieldEnumSchema,ColumnClassificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ColumnClassificationAggregateArgsSchema: z.ZodType<Prisma.ColumnClassificationAggregateArgs> = z.object({
  where: ColumnClassificationWhereInputSchema.optional(),
  orderBy: z.union([ ColumnClassificationOrderByWithRelationInputSchema.array(),ColumnClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ColumnClassificationGroupByArgsSchema: z.ZodType<Prisma.ColumnClassificationGroupByArgs> = z.object({
  where: ColumnClassificationWhereInputSchema.optional(),
  orderBy: z.union([ ColumnClassificationOrderByWithAggregationInputSchema.array(),ColumnClassificationOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnClassificationScalarFieldEnumSchema.array(),
  having: ColumnClassificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ColumnClassificationFindUniqueArgsSchema: z.ZodType<Prisma.ColumnClassificationFindUniqueArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereUniqueInputSchema,
}).strict() ;

export const ColumnClassificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnClassificationFindUniqueOrThrowArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereUniqueInputSchema,
}).strict() ;

export const PolicyTagDecisionFindFirstArgsSchema: z.ZodType<Prisma.PolicyTagDecisionFindFirstArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereInputSchema.optional(),
  orderBy: z.union([ PolicyTagDecisionOrderByWithRelationInputSchema.array(),PolicyTagDecisionOrderByWithRelationInputSchema ]).optional(),
  cursor: PolicyTagDecisionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PolicyTagDecisionScalarFieldEnumSchema,PolicyTagDecisionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PolicyTagDecisionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PolicyTagDecisionFindFirstOrThrowArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereInputSchema.optional(),
  orderBy: z.union([ PolicyTagDecisionOrderByWithRelationInputSchema.array(),PolicyTagDecisionOrderByWithRelationInputSchema ]).optional(),
  cursor: PolicyTagDecisionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PolicyTagDecisionScalarFieldEnumSchema,PolicyTagDecisionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PolicyTagDecisionFindManyArgsSchema: z.ZodType<Prisma.PolicyTagDecisionFindManyArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereInputSchema.optional(),
  orderBy: z.union([ PolicyTagDecisionOrderByWithRelationInputSchema.array(),PolicyTagDecisionOrderByWithRelationInputSchema ]).optional(),
  cursor: PolicyTagDecisionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PolicyTagDecisionScalarFieldEnumSchema,PolicyTagDecisionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PolicyTagDecisionAggregateArgsSchema: z.ZodType<Prisma.PolicyTagDecisionAggregateArgs> = z.object({
  where: PolicyTagDecisionWhereInputSchema.optional(),
  orderBy: z.union([ PolicyTagDecisionOrderByWithRelationInputSchema.array(),PolicyTagDecisionOrderByWithRelationInputSchema ]).optional(),
  cursor: PolicyTagDecisionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PolicyTagDecisionGroupByArgsSchema: z.ZodType<Prisma.PolicyTagDecisionGroupByArgs> = z.object({
  where: PolicyTagDecisionWhereInputSchema.optional(),
  orderBy: z.union([ PolicyTagDecisionOrderByWithAggregationInputSchema.array(),PolicyTagDecisionOrderByWithAggregationInputSchema ]).optional(),
  by: PolicyTagDecisionScalarFieldEnumSchema.array(),
  having: PolicyTagDecisionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PolicyTagDecisionFindUniqueArgsSchema: z.ZodType<Prisma.PolicyTagDecisionFindUniqueArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereUniqueInputSchema,
}).strict() ;

export const PolicyTagDecisionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PolicyTagDecisionFindUniqueOrThrowArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereUniqueInputSchema,
}).strict() ;

export const ScanStatusFindFirstArgsSchema: z.ZodType<Prisma.ScanStatusFindFirstArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereInputSchema.optional(),
  orderBy: z.union([ ScanStatusOrderByWithRelationInputSchema.array(),ScanStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: ScanStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScanStatusScalarFieldEnumSchema,ScanStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScanStatusFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScanStatusFindFirstOrThrowArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereInputSchema.optional(),
  orderBy: z.union([ ScanStatusOrderByWithRelationInputSchema.array(),ScanStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: ScanStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScanStatusScalarFieldEnumSchema,ScanStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScanStatusFindManyArgsSchema: z.ZodType<Prisma.ScanStatusFindManyArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereInputSchema.optional(),
  orderBy: z.union([ ScanStatusOrderByWithRelationInputSchema.array(),ScanStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: ScanStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ScanStatusScalarFieldEnumSchema,ScanStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ScanStatusAggregateArgsSchema: z.ZodType<Prisma.ScanStatusAggregateArgs> = z.object({
  where: ScanStatusWhereInputSchema.optional(),
  orderBy: z.union([ ScanStatusOrderByWithRelationInputSchema.array(),ScanStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: ScanStatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScanStatusGroupByArgsSchema: z.ZodType<Prisma.ScanStatusGroupByArgs> = z.object({
  where: ScanStatusWhereInputSchema.optional(),
  orderBy: z.union([ ScanStatusOrderByWithAggregationInputSchema.array(),ScanStatusOrderByWithAggregationInputSchema ]).optional(),
  by: ScanStatusScalarFieldEnumSchema.array(),
  having: ScanStatusScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ScanStatusFindUniqueArgsSchema: z.ZodType<Prisma.ScanStatusFindUniqueArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereUniqueInputSchema,
}).strict() ;

export const ScanStatusFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScanStatusFindUniqueOrThrowArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereUniqueInputSchema,
}).strict() ;

export const TableHistoryFindFirstArgsSchema: z.ZodType<Prisma.TableHistoryFindFirstArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TableHistoryOrderByWithRelationInputSchema.array(),TableHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TableHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TableHistoryScalarFieldEnumSchema,TableHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TableHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TableHistoryFindFirstOrThrowArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TableHistoryOrderByWithRelationInputSchema.array(),TableHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TableHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TableHistoryScalarFieldEnumSchema,TableHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TableHistoryFindManyArgsSchema: z.ZodType<Prisma.TableHistoryFindManyArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TableHistoryOrderByWithRelationInputSchema.array(),TableHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TableHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TableHistoryScalarFieldEnumSchema,TableHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TableHistoryAggregateArgsSchema: z.ZodType<Prisma.TableHistoryAggregateArgs> = z.object({
  where: TableHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TableHistoryOrderByWithRelationInputSchema.array(),TableHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: TableHistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TableHistoryGroupByArgsSchema: z.ZodType<Prisma.TableHistoryGroupByArgs> = z.object({
  where: TableHistoryWhereInputSchema.optional(),
  orderBy: z.union([ TableHistoryOrderByWithAggregationInputSchema.array(),TableHistoryOrderByWithAggregationInputSchema ]).optional(),
  by: TableHistoryScalarFieldEnumSchema.array(),
  having: TableHistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TableHistoryFindUniqueArgsSchema: z.ZodType<Prisma.TableHistoryFindUniqueArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereUniqueInputSchema,
}).strict() ;

export const TableHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TableHistoryFindUniqueOrThrowArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereUniqueInputSchema,
}).strict() ;

export const ColumnCreateArgsSchema: z.ZodType<Prisma.ColumnCreateArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  data: z.union([ ColumnCreateInputSchema,ColumnUncheckedCreateInputSchema ]),
}).strict() ;

export const ColumnUpsertArgsSchema: z.ZodType<Prisma.ColumnUpsertArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
  create: z.union([ ColumnCreateInputSchema,ColumnUncheckedCreateInputSchema ]),
  update: z.union([ ColumnUpdateInputSchema,ColumnUncheckedUpdateInputSchema ]),
}).strict() ;

export const ColumnCreateManyArgsSchema: z.ZodType<Prisma.ColumnCreateManyArgs> = z.object({
  data: z.union([ ColumnCreateManyInputSchema,ColumnCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ColumnCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ColumnCreateManyAndReturnArgs> = z.object({
  data: z.union([ ColumnCreateManyInputSchema,ColumnCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ColumnDeleteArgsSchema: z.ZodType<Prisma.ColumnDeleteArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema,
}).strict() ;

export const ColumnUpdateArgsSchema: z.ZodType<Prisma.ColumnUpdateArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  data: z.union([ ColumnUpdateInputSchema,ColumnUncheckedUpdateInputSchema ]),
  where: ColumnWhereUniqueInputSchema,
}).strict() ;

export const ColumnUpdateManyArgsSchema: z.ZodType<Prisma.ColumnUpdateManyArgs> = z.object({
  data: z.union([ ColumnUpdateManyMutationInputSchema,ColumnUncheckedUpdateManyInputSchema ]),
  where: ColumnWhereInputSchema.optional(),
}).strict() ;

export const ColumnDeleteManyArgsSchema: z.ZodType<Prisma.ColumnDeleteManyArgs> = z.object({
  where: ColumnWhereInputSchema.optional(),
}).strict() ;

export const ColumnClassificationCreateArgsSchema: z.ZodType<Prisma.ColumnClassificationCreateArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  data: z.union([ ColumnClassificationCreateInputSchema,ColumnClassificationUncheckedCreateInputSchema ]),
}).strict() ;

export const ColumnClassificationUpsertArgsSchema: z.ZodType<Prisma.ColumnClassificationUpsertArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereUniqueInputSchema,
  create: z.union([ ColumnClassificationCreateInputSchema,ColumnClassificationUncheckedCreateInputSchema ]),
  update: z.union([ ColumnClassificationUpdateInputSchema,ColumnClassificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ColumnClassificationCreateManyArgsSchema: z.ZodType<Prisma.ColumnClassificationCreateManyArgs> = z.object({
  data: z.union([ ColumnClassificationCreateManyInputSchema,ColumnClassificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ColumnClassificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ColumnClassificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ ColumnClassificationCreateManyInputSchema,ColumnClassificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ColumnClassificationDeleteArgsSchema: z.ZodType<Prisma.ColumnClassificationDeleteArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  where: ColumnClassificationWhereUniqueInputSchema,
}).strict() ;

export const ColumnClassificationUpdateArgsSchema: z.ZodType<Prisma.ColumnClassificationUpdateArgs> = z.object({
  select: ColumnClassificationSelectSchema.optional(),
  include: ColumnClassificationIncludeSchema.optional(),
  data: z.union([ ColumnClassificationUpdateInputSchema,ColumnClassificationUncheckedUpdateInputSchema ]),
  where: ColumnClassificationWhereUniqueInputSchema,
}).strict() ;

export const ColumnClassificationUpdateManyArgsSchema: z.ZodType<Prisma.ColumnClassificationUpdateManyArgs> = z.object({
  data: z.union([ ColumnClassificationUpdateManyMutationInputSchema,ColumnClassificationUncheckedUpdateManyInputSchema ]),
  where: ColumnClassificationWhereInputSchema.optional(),
}).strict() ;

export const ColumnClassificationDeleteManyArgsSchema: z.ZodType<Prisma.ColumnClassificationDeleteManyArgs> = z.object({
  where: ColumnClassificationWhereInputSchema.optional(),
}).strict() ;

export const PolicyTagDecisionCreateArgsSchema: z.ZodType<Prisma.PolicyTagDecisionCreateArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  data: z.union([ PolicyTagDecisionCreateInputSchema,PolicyTagDecisionUncheckedCreateInputSchema ]),
}).strict() ;

export const PolicyTagDecisionUpsertArgsSchema: z.ZodType<Prisma.PolicyTagDecisionUpsertArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereUniqueInputSchema,
  create: z.union([ PolicyTagDecisionCreateInputSchema,PolicyTagDecisionUncheckedCreateInputSchema ]),
  update: z.union([ PolicyTagDecisionUpdateInputSchema,PolicyTagDecisionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PolicyTagDecisionCreateManyArgsSchema: z.ZodType<Prisma.PolicyTagDecisionCreateManyArgs> = z.object({
  data: z.union([ PolicyTagDecisionCreateManyInputSchema,PolicyTagDecisionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PolicyTagDecisionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PolicyTagDecisionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PolicyTagDecisionCreateManyInputSchema,PolicyTagDecisionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PolicyTagDecisionDeleteArgsSchema: z.ZodType<Prisma.PolicyTagDecisionDeleteArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  where: PolicyTagDecisionWhereUniqueInputSchema,
}).strict() ;

export const PolicyTagDecisionUpdateArgsSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateArgs> = z.object({
  select: PolicyTagDecisionSelectSchema.optional(),
  include: PolicyTagDecisionIncludeSchema.optional(),
  data: z.union([ PolicyTagDecisionUpdateInputSchema,PolicyTagDecisionUncheckedUpdateInputSchema ]),
  where: PolicyTagDecisionWhereUniqueInputSchema,
}).strict() ;

export const PolicyTagDecisionUpdateManyArgsSchema: z.ZodType<Prisma.PolicyTagDecisionUpdateManyArgs> = z.object({
  data: z.union([ PolicyTagDecisionUpdateManyMutationInputSchema,PolicyTagDecisionUncheckedUpdateManyInputSchema ]),
  where: PolicyTagDecisionWhereInputSchema.optional(),
}).strict() ;

export const PolicyTagDecisionDeleteManyArgsSchema: z.ZodType<Prisma.PolicyTagDecisionDeleteManyArgs> = z.object({
  where: PolicyTagDecisionWhereInputSchema.optional(),
}).strict() ;

export const ScanStatusCreateArgsSchema: z.ZodType<Prisma.ScanStatusCreateArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  data: z.union([ ScanStatusCreateInputSchema,ScanStatusUncheckedCreateInputSchema ]),
}).strict() ;

export const ScanStatusUpsertArgsSchema: z.ZodType<Prisma.ScanStatusUpsertArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereUniqueInputSchema,
  create: z.union([ ScanStatusCreateInputSchema,ScanStatusUncheckedCreateInputSchema ]),
  update: z.union([ ScanStatusUpdateInputSchema,ScanStatusUncheckedUpdateInputSchema ]),
}).strict() ;

export const ScanStatusCreateManyArgsSchema: z.ZodType<Prisma.ScanStatusCreateManyArgs> = z.object({
  data: z.union([ ScanStatusCreateManyInputSchema,ScanStatusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ScanStatusCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ScanStatusCreateManyAndReturnArgs> = z.object({
  data: z.union([ ScanStatusCreateManyInputSchema,ScanStatusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ScanStatusDeleteArgsSchema: z.ZodType<Prisma.ScanStatusDeleteArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  where: ScanStatusWhereUniqueInputSchema,
}).strict() ;

export const ScanStatusUpdateArgsSchema: z.ZodType<Prisma.ScanStatusUpdateArgs> = z.object({
  select: ScanStatusSelectSchema.optional(),
  data: z.union([ ScanStatusUpdateInputSchema,ScanStatusUncheckedUpdateInputSchema ]),
  where: ScanStatusWhereUniqueInputSchema,
}).strict() ;

export const ScanStatusUpdateManyArgsSchema: z.ZodType<Prisma.ScanStatusUpdateManyArgs> = z.object({
  data: z.union([ ScanStatusUpdateManyMutationInputSchema,ScanStatusUncheckedUpdateManyInputSchema ]),
  where: ScanStatusWhereInputSchema.optional(),
}).strict() ;

export const ScanStatusDeleteManyArgsSchema: z.ZodType<Prisma.ScanStatusDeleteManyArgs> = z.object({
  where: ScanStatusWhereInputSchema.optional(),
}).strict() ;

export const TableHistoryCreateArgsSchema: z.ZodType<Prisma.TableHistoryCreateArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  data: z.union([ TableHistoryCreateInputSchema,TableHistoryUncheckedCreateInputSchema ]),
}).strict() ;

export const TableHistoryUpsertArgsSchema: z.ZodType<Prisma.TableHistoryUpsertArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereUniqueInputSchema,
  create: z.union([ TableHistoryCreateInputSchema,TableHistoryUncheckedCreateInputSchema ]),
  update: z.union([ TableHistoryUpdateInputSchema,TableHistoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const TableHistoryCreateManyArgsSchema: z.ZodType<Prisma.TableHistoryCreateManyArgs> = z.object({
  data: z.union([ TableHistoryCreateManyInputSchema,TableHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TableHistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TableHistoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ TableHistoryCreateManyInputSchema,TableHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TableHistoryDeleteArgsSchema: z.ZodType<Prisma.TableHistoryDeleteArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  where: TableHistoryWhereUniqueInputSchema,
}).strict() ;

export const TableHistoryUpdateArgsSchema: z.ZodType<Prisma.TableHistoryUpdateArgs> = z.object({
  select: TableHistorySelectSchema.optional(),
  data: z.union([ TableHistoryUpdateInputSchema,TableHistoryUncheckedUpdateInputSchema ]),
  where: TableHistoryWhereUniqueInputSchema,
}).strict() ;

export const TableHistoryUpdateManyArgsSchema: z.ZodType<Prisma.TableHistoryUpdateManyArgs> = z.object({
  data: z.union([ TableHistoryUpdateManyMutationInputSchema,TableHistoryUncheckedUpdateManyInputSchema ]),
  where: TableHistoryWhereInputSchema.optional(),
}).strict() ;

export const TableHistoryDeleteManyArgsSchema: z.ZodType<Prisma.TableHistoryDeleteManyArgs> = z.object({
  where: TableHistoryWhereInputSchema.optional(),
}).strict() ;