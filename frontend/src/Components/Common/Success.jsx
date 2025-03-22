export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <div className="mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Success"
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Thank You for Your Order!
        </h2>
        <p className="text-gray-600">
          Your order has been placed successfully.
        </p>

        <button
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
