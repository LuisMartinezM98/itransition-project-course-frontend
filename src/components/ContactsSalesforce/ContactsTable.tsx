import { useSalesForce } from "../../Providers/Providers"


const ContactsTable = () => {

    const {contacts} = useSalesForce()

  return (
    <div className="relative overflow-x-auto overflow-y-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-white uppercase bg-blue-says ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item) => (
            <tr className="bg-white border-b boder-4 border-blue-says hover:bg-blue-says hover:text-white transition-colors ease-in-out delay-100 duration-300 cursor-pointer" title="See survey">
              <td className="px-6 py-4">{item.FirstName + ' ' + item.LastName}</td>
              <td className="px-6 py-4">{item.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactsTable