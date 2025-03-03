import { Address, General } from '../components';

const Checkout = () => {
  return (
    <section id='checkout' className='py-5 bg-gray-50'>
      <div className='flex flex-col lg:flex-row sm:gap-8'>
        {/* <!-- Checkout Form --> */}
        <div className='lg:w-2/3'>
          <div className='bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full overflow-hidden'>
            {/* <!-- Checkout Progress --> */}
            <div className='flex items-center space-x-4 overflow-x-auto scrollbar-hidden w-full'>
              <div className='flex items-center'>
                <div className='bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center'>
                  1
                </div>
                <span className='ml-2 font-semibold'>Shipping</span>
              </div>
              <div className='w-24 h-0.5 bg-gray-300'></div>
              <div className='flex items-center'>
                <div className='border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                  2
                </div>
                <span className='ml-2'>Address</span>
              </div>
              <div className='w-24 h-0.5 bg-gray-300'></div>
              <div className='flex items-center'>
                <div className='border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                  2
                </div>
                <span className='ml-2'>Payment</span>
              </div>
              <div className='w-24 h-0.5 bg-gray-300'></div>
              <div className='flex items-center'>
                <div className='border-2 w-8 h-8 rounded-full flex items-center justify-center'>
                  3
                </div>
                <span className='ml-2'>Review</span>
              </div>
            </div>

            <General />
            {/* <Address /> */}
          </div>
        </div>

        {/* <!-- Order Summary --> */}
        <div className='lg:w-1/3'>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

            {/* <!-- Order Items --> */}
            <div className='space-y-4 mb-6'>
              <div className='flex items-center'>
                <img
                  src='https://placehold.co/80x80'
                  alt='Product'
                  className='w-20 h-20 object-cover rounded transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
                <div className='ml-4 flex-1'>
                  <h3 className='font-semibold'>Smartphone X Pro</h3>
                  <p className='text-sm text-gray-600'>Qty: 1</p>
                </div>
                <span className='font-semibold'>$799.99</span>
              </div>

              <div className='flex items-center'>
                <img
                  src='https://placehold.co/80x80'
                  alt='Product'
                  className='w-20 h-20 object-cover rounded transition-opacity duration-300 opacity-100'
                  loading='lazy'
                />
                <div className='ml-4 flex-1'>
                  <h3 className='font-semibold'>Wireless Headphones</h3>
                  <p className='text-sm text-gray-600'>Qty: 1</p>
                </div>
                <span className='font-semibold'>$149.99</span>
              </div>
            </div>

            <div className='border-t pt-4 space-y-4'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Subtotal</span>
                <span className='font-semibold'>$949.98</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Shipping</span>
                <span className='font-semibold'>Free</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Tax</span>
                <span className='font-semibold'>$95.00</span>
              </div>
              <div className='flex justify-between text-lg font-bold'>
                <span>Total</span>
                <span>$1,044.98</span>
              </div>
            </div>

            <button className='w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors'>
              Continue to Payment
            </button>

            {/* <!-- Security Badge --> */}
            <div className='mt-6 flex items-center justify-center text-gray-600 text-sm'>
              <i className='fa-solid fa-lock mr-2'></i>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
