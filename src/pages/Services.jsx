import { services } from "../data"

const Services = () => {
    return (
        <div className="w-full pb-8">
            <div className="pt-6 pb-6 flex gap-2 font-bold text-3xl lg:text-4xl">
                <h1>Our</h1>
                <h1 className="text-orange-500">Services</h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row">
                <div className="w-full lg:w-1/2 grid grid-cols-1 xs:grid-cols-2 gap-4">
                    {services.map((service) => (
                        <div className="flex flex-col gap-4 shadow-lg p-4 rounded-md bg-gray-800" key={service.id}>
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-300 shadow-xl">
                                <img className="w-10 h-10 object-contain" src={service.icon} alt="" />
                            </div>
                            <h3 className="text-orange-500 font-bold">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full sm:w-1/2 hidden lg:flex items-center justify-center">
                    <img className="w-full h-96 object-contain" src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-boy-2496108-2096425.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Services
