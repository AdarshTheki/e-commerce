import React from 'react';

type HandleProp = {
    handlePageChange: (value: number) => void;
    page: number;
    totalPages: number;
};

const RenderPaginationButtons: React.FC<HandleProp> = ({
    page,
    totalPages,
    handlePageChange,
}) => {
    const buttons = [];

    // Always show the first page
    buttons.push(
        <button
            key={1}
            className={`btn text-xs !py-1 !px-2 ${
                page === 1
                    ? 'bg-indigo-600 text-white'
                    : 'border border-neutral-200 hover:bg-gray-50'
            } rounded-lg`}
            onClick={() => handlePageChange(1)}>
            1
        </button>
    );

    // Show the second page if it exists
    if (totalPages >= 2) {
        buttons.push(
            <button
                key={2}
                className={`btn text-xs !py-1 !px-2 ${
                    page === 2
                        ? 'bg-indigo-600 text-white'
                        : 'border border-neutral-200 hover:bg-gray-50'
                } rounded-lg`}
                onClick={() => handlePageChange(2)}>
                2
            </button>
        );
    }

    // Show "..." if there are more pages between the second and last page
    if (totalPages > 2 && page > 3) {
        buttons.push(
            <span
                key="ellipsis"
                className="btn text-xs !py-1 !px-2 border border-neutral-200 rounded-lg">
                ...
            </span>
        );
    }

    // Show the current page if it's not the first or second page
    if (page > 2 && page < totalPages) {
        buttons.push(
            <button
                key={page}
                className="btn text-xs !py-1 !px-2 bg-indigo-600 text-white rounded-lg"
                onClick={() => handlePageChange(page)}>
                {page}
            </button>
        );
    }

    // Show the last page if it's not already shown
    if (totalPages > 2) {
        buttons.push(
            <button
                key={totalPages}
                className={`btn text-xs !py-1 !px-2 ${
                    page === totalPages
                        ? 'bg-indigo-600 text-white'
                        : 'border border-neutral-200 hover:bg-gray-50'
                } rounded-lg`}
                onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </button>
        );
    }

    return buttons;
};

export default RenderPaginationButtons;
