import { NavLink } from "react-router-dom";
import { LazyImage, Loading, NotFound } from "../utils";
import { useCallback } from "react";

const HomeCard = ({ heading = "", items = [], slug = "" }) => {
  const itemRender = useCallback(() => {
    return (
      <div className="relative container mx-auto sm:p-4 p-3">
        <h2 className="font-medium text-xl">{heading || "heading"}</h2>

        {items && items?.length > 1 ? (
          <div
            className={`w-full snap-x relative py-5 sm:gap-4 gap-2 flex overflow-x-auto scrollbar-hidden`}>
            {items?.map((item) => (
              <NavLink
                to={slug ? `/product?${slug}=${item?.title}` : "/product"}
                key={item?._id}
                className="snap-start min-w-[240px] rounded-lg overflow-hidden">
                <LazyImage
                  src={item?.thumbnail}
                  placeholder="/placeholder.jpg"
                  alt="New Release 1"
                  className="w-full h-[240px] object-cover"
                />
                <h3 className="capitalize text-slate-600 font-medium line-clamp-1 px-4 py-2">
                  {item?.title}
                </h3>
              </NavLink>
            ))}
          </div>
        ) : (
          <Loading className="h-[200px]" />
        )}
        <div className="absolute top-10 bottom-0 right-0 w-14 bg-gradient-to-r to-gray-100"></div>
      </div>
    );
  }, [heading, items, slug]);

  if (!items?.length)
    return (
      <NotFound
        mainClass="min-h-[200px]"
        canvas={null}
        title={null}
        linkTo=""
      />
    );

  return itemRender();
};

export default HomeCard;
