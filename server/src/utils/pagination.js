// Aggregation Pipeline

export const pagination = (
  filter = [],
  page = "1",
  limit = 50,
  sortBy = "createdAt",
  orderBy = -1
) => {
  const skip = (Number(page) - 1) * limit;
  const numericLimit = Number(limit);

  return [
    ...filter,
    {
      $sort: { [sortBy]: orderBy },
    },
    {
      $facet: {
        total: [{ $count: "count" }],
        data: [{ $skip: skip }, { $limit: numericLimit }],
      },
    },
    {
      $unwind: "$total",
    },
    {
      $project: {
        items: "$data",
        page: { $literal: skip / numericLimit + 1 },
        hasNextPage: {
          $lt: [{ $multiply: [numericLimit, Number(page)] }, "$total.count"],
        },
        hasPreviousPage: {
          $gt: [skip, 0],
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.count", numericLimit],
          },
        },
        totalItems: "$total.count",
      },
    },
  ];
};
