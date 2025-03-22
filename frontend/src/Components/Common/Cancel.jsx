export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <div className="mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
            alt="Cancel"
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Cancelled
        </h2>
        <p className="text-gray-600">
          We're sorry, but your order has been cancelled. Please contact support if you need further assistance.
        </p>

        <button
          className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
