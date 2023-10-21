const About = () => {
    return (
        <div className="w-full flex flex-col-reverse gap-4 md:flex-row justify-center items-center">
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row">
                <img src="https://www.freepnglogos.com/uploads/chef-png/png-psd-download-chef-cook-vector-illustration-14.png" alt="" />
            </div>
            <div className="w-full flex flex-col gap-4 lg:w-1/2">
                <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                    <h1>About</h1>
                    <h1 className="text-orange-500">Us</h1>
                </div>
                <p className="text-sm font-semibold md:text-md">The menu at Gourmet Haven is a testament to the {"chef's"} dedication to culinary excellence.</p>
                <p className="text-sm font-semibold md:text-md">As you step through the {"restaurant's"} elegant entrance, you are greeted by soft, dimmed lighting that creates an intimate atmosphere. The walls are adorned with tasteful artwork, and soft jazz music fills the air, setting the perfect backdrop for a memorable meal</p>
                <p className="text-sm font-semibold md:text-md">The attentive and friendly staff at Gourmet Haven are dedicated to providing exceptional service. Whether {"you're"} celebrating a special occasion or simply enjoying a night out, they ensure that every guest feels welcomed and well-cared for!</p>
                <button className="max-w-max bg-orange-500 px-4 py-2 text-white rounded-md">Read more</button>
            </div>
        </div>
    )
}

export default About
