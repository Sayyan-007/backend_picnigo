const express = require('express')
const userRoute = require('./Routes/user.routes')
const AgencyRoute = require('./Routes/Agency.routes')
const TourismPackage = require('./Routes/TourismPackage.routes')   
const {database} = require('./Config/user.database')
require('dotenv').config()
const cors = require('cors')
const booknowTouristRoute = require('./Routes/booknowagency.routes')
const hotelmangmentRoute = require('./Routes/hotelmangment.routes')
const HotelPackageRoute = require('./Routes/hotelPackage.routes')
const campOrganizationRoute = require('./Routes/Camporganization.routes')
const CampPackageRoute = require('./Routes/camppackages.routes')
const adminRoute = require('./Routes/admin.routes')

const app = express()

app.use(express.json())
database()

app.use(cors())

app.use('/user',userRoute)

app.use('/agency',AgencyRoute)
app.use('/tourismpackage',TourismPackage)
app.use('/book',booknowTouristRoute)

app.use('/hotelmangment',hotelmangmentRoute)
app.use('/hotelpackage',HotelPackageRoute)

app.use('/oraganization',campOrganizationRoute)
app.use('/camppackage',CampPackageRoute)

app.use('/admin',adminRoute)

app.listen(process.env.PORT,error=>{
    if(error)
    {
        return process.exit(1)
    }
    console.log(process.env.PORT,"Running Successfully");
    
})