const AddClientModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-[600px] max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add a New Client</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
            >
              &times;
            </button>
          </div>
          
          <div className="mb-4 text-gray-600 italic">
            This client is a company and invoices will be addressed to the company.
          </div>
  
          <form>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">First Name*</label>
                <input 
                  type="text" 
                  placeholder="Enter first name" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  required
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Enter last name" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Phone</label>
                <input 
                  type="tel" 
                  placeholder="Enter client contact number e.g. +61 432 567 890" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Email*</label>
                <input 
                  type="email" 
                  placeholder="Enter client email e.g. info@peterphong.com" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  required
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Street Address</label>
                <input 
                  type="text" 
                  placeholder="Enter client street address" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Suburb/Town</label>
                <input 
                  type="text" 
                  placeholder="Enter client town or suburb" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Postcode/Zip</label>
                <input 
                  type="text" 
                  placeholder="Enter client postcode or zip code" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">State</label>
                <input 
                  type="text" 
                  placeholder="Enter client state" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Country</label>
                <input 
                  type="text" 
                  placeholder="Enter client county" 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
  
              <div>
                <label className="block font-medium mb-1 text-gray-700">Add Note</label>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[80px]" 
                />
              </div>
            </div>
  
            <div className="flex gap-2 mt-6">
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Client Profile
              </button>
              <button 
                onClick={onClose} 
                type="button" 
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddClientModal;