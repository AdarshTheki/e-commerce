// Aggregation Pipeline

export const pagination = (
  filter,
  page = "1",
  limit = 50,
  sortBy = "createdAt",
  orderBy = -1
) => {
  const skip = (Number(page) - 1) * limit;

  return [
    filter,
    {
      $sort: {
        [sortBy]: orderBy,
      },
    },

    {
      $facet: {
        total: [
          {
            $count: "count",
          },
        ],
        data: [
          {
            $addFields: {
              _id: "$_id",
            },
          },
        ],
      },
    },
    {
      $unwind: "$total",
    },

    {
      $project: {
        items: {
          $slice: [
            "$data",
            skip,
            {
              $ifNull: [limit, "$total.count"],
            },
          ],
        },
        page: {
          $literal: skip / limit + 1,
        },
        hasNextPage: {
          $lt: [{ $multiply: [limit, Number(page)] }, "$total.count"],
        },
        hasPreviousPage: {
          $gt: [skip, 0],
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.count", limit],
          },
        },
        totalItems: "$total.count",
      },
    },
  ];
};
