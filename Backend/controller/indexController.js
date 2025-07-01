const CompModel = require("../model/companies");
const ProdModel = require("../model/products");
const SuppModel = require("../model/suppliers");
const validators = require("../utilities/validators");

const createData = async (req, res, next) => {
    try {
        // delete companies
        let delComp = await CompModel.deleteMany();
        if (delComp.deletedCount > 0) {
            console.log("Deleted all Companies");
        }
        // create companies
        let compData = await CompModel.create([
            {
                whyUs:
                    "Good health is indeed the most valuable thing for everyone. And for more than 100 years, we are with the people of the world for laying the foundation of vibrant lives. Today, as the world's largest and most extended Healthcare company, we are bound to use our reach and size for good. We diligently attempt to improve access and affordability, create healthier communities, and help people attain their best health at every life stage.",
                vision:
                    "To be one of the world's most innovative, best doing, and committed pharmaceutical company.",
                mission:
                    "To provide the best quality products to people of the world. To commit ourselves for humanity's search for longer healthier, happier lives through innovation in medicines.",
                contactUs: {
                    address: "XYZPharma, Bhopal, Madhya Pradesh",
                    businessHours: "24x7",
                    contactNumber: "9011236784",
                },
                quaterDetails: [
                    {
                        quater: "Q32018",
                        result: {
                            sales: 2800156,
                            otherIncome: 349.7,
                            grossProfit: 217993.4,
                            depreciation: 2992.8,
                            interest: 10899.67,
                            tax: 27249.2,
                            netProfit: 176851.7,
                        },
                    },
                    {
                        quater: "Q42018",
                        result: {
                            sales: 9563528,
                            otherIncome: 956.2,
                            grossProfit: 917993.4,
                            depreciation: 6992.8,
                            interest: 29899.67,
                            tax: 62356.9,
                            netProfit: 635284.6,
                        },
                    },
                ],
            },
        ]);

        // delete products
        let delProd = await ProdModel.deleteMany();
        if (delProd.deletedCount > 0) {
            console.log("Deleted all Products");
        }

        // create products
        let prodData = await ProdModel.create([
            {
                name: "Product One",
                saltComposition: "20%",
                about: "This is the description for Product One",
                use: "Use Case One, Use Case Two",
                sideEffects: "None",
            },
            {
                name: "Product Two",
                saltComposition: "30%",
                about: "This is the description for Product Two",
                use: "Use Case Three, Use Case Four",
                sideEffects: "Three Potential Side Effects",
            },
            {
                name: "Product Three",
                saltComposition: "40%",
                about: "This is the description for Product Three",
                use: "Use Case Five, Use Case Six",
                sideEffects: "Five Potential Side Effects",
            },
        ]);

        //delete suppliers
        let delSupp = await SuppModel.deleteMany();
        if (delSupp.deletedCount > 0) {
            console.log("Deleted all Suppliers");
        }

        // create suppliers
        let suppData = await SuppModel.create([
            {
                companyName: "Supplier One",
                officialEmailId: "SupplierOne@gmail.com",
                contactNumber: "9876543210",
                durationOfContract: "2",
                dor: "10-10-2023",
            },
            {
                companyName: "Supplier Two",
                officialEmailId: "SupplierTwo@gmail.com",
                contactNumber: "9988776655",
                durationOfContract: "15",
                dor: "30-08-2004",
            },
            {
                companyName: "Supplier Three",
                officialEmailId: "Supplier Three@gmail.com",
                contactNumber: "9911002233",
                durationOfContract: "6",
                dor: "25-11-2006",
            },
        ]);

        if (compData && prodData && suppData) {
            console.log("Data Created");
            res.status(200).json({ message: "Data Created" });
        }
    } catch (err) {
        next(err);
    }
};

const getCompanies = async (req, res, next) => {
    try {
        let foundCompanies = await CompModel.find({});
        if (foundCompanies.length < 1) {
            let err = new Error();
            err.message = "Unable to fetch Company Details. Please try later!!";
            err.status = 400;
            throw err;
        }
        res.status(200).json({
            companyDetail: foundCompanies,
        });
    } catch (err) {
        next(err);
    }
};

const getProducts = async (req, res, next) => {
    try {
        let foundProducts = await ProdModel.find({});
        if (foundProducts.length < 1) {
            let err = new Error("Unable to fetch Details of the Products. Please try later!");
            err.status = 400;
            throw err;
        }
        res.status(200).json({ products: foundProducts });
    } catch (err) {
        next(err);
    }
};


const getProduct = async (req, res, next) => {
    try {
        let foundProduct = await ProdModel.find({ name: req.params.product });

        if (foundProduct.length < 1) {
            let err = new Error("This product is not manufactured by XYZ Pharma");
            err.status = 400;
            throw err;
        }

        res.status(200).json({ searchResult: foundProduct });
    } catch (err) {
        next(err);
    }
};



const getQuaterlyResult = async (req, res, next) => {
    try {
        // let { quater, fyear } = req.body;
        let { quater, fyear } = req.query;
        let foundResult = await CompModel.find(
            {
                quaterDetails: { $elemMatch: { quater: `${quater}${fyear}` } }
            },
    { quaterDetails: 1 }
); 
console.log(foundResult.length);
if (foundResult.length < 1) {
    let err = new Error();
    err.message = "Currently available quater details are of: Q32018, Q42018";
    err.status = 400;
    throw err;
}
let actualResult = foundResult[0].quaterDetails.filter(
    (item) => item.quater === `${quater}${fyear}`
);
console.log(actualResult);
res.status(200).json({ QuaterlyDetails: actualResult[0] });
} catch (err) {
    next(err);
}
};

const getContactDetails = async (req, res, next) => {
    try {
        // let foundDetails = await CompModel.find({}, { id: 8, contactUs: 1 });
        let foundDetails = await CompModel.find({}, { contactUs: 1 });
        if (foundDetails.length < 1) {
            let err = new Error();
            err.message = "Unable to fetch Contact Details. Please try later!!";
            err.status = 400;
            throw err;
        }
        res.status(200).json({
            "Details to": foundDetails,
        });
    } catch (err) {
        next(err);
    }
}

const changeContactNumber = async (req, res, next) => {
    try {
        if (!validators.validateMobileNo(req.body.contactNumber)) {
            res.status(400).json({ message: "Phone number should have 10 digits" });
        } else {
            let updatedSupplier = await SuppModel.findOneAndUpdate(
                { officialEmailId: req.body.officialEmailId },
                { $set: { contactNumber: req.body.contactNumber } },
{ new: true }
);
if (updatedSupplier) {
    res
        .status(200)
        .json({message: "Successfully updated the contact number" });
} else {
    res.status(400).json({
        message: "Supplier doesn't exist!! Please check your credentials",
    });
}
}
} catch (err) {
    err.message = "Contact number updation failed! Please try later";
    err.status = 400;
    next(err);
}
};


const deleteSupplier = async (req, res, next) => {
    try {
        let deletedSupplier = await SuppModel.deleteOne({
            officialEmailId: req.body.officialEmailId,
        });
        if (deletedSupplier.deletedCount > 0) {
            res
                .status(200)
                .json({ message: "Deletion Successful, Supplier removed" });
        } else {
            res.status(400).json({
                message: "Supplier doesn't exist. Please check your credentials",
 });
    }
}
catch (err) {
    next(err);
}
};

const addSupplier = async (req, res, next) => {
    try {
        console.log(req.body); 
        if (!validators.validateName(req.body.companyName)) {
             res.status(400).json({
                message: "Company name cannot be empty!!!", 
            });
    } 
    else if (!validators.validateEmail(req.body.officialEmailId)) {
        res.status(400).json({ 
            message: "Enter a valid Email Id",
         });
    } else if (!validators.validateMobileNo(req.body.contactNumber)) {
        res.status(400).json({
            message: "Phone number should have 10 digits",
        });
    } else if (!validators.validateDuration(req.body.durationOfContract)) {
        res.status(400).json({
        message: "Please notel Minimum duration for contract is 1 year",
    });
}
else if (!validators.validateDate(req.body.dor)) {
    res.status(400).json({
        message: "Registration date cannot be lesser than today",
    });
} else {
    let newSupplier = await SuppModel.create(req.body);
    res.status(200).json({ message: "Supplier registration successful" });
}
} catch (err) {
    if (err.code === 11000) {
        err.message = "Supplier have already registered!!";
        err.status = 400;
    } else {
        err.message = "Registration Failed!! Please try again...";
        err.status = 400;
    }
    next(err);
}
};


module.exports = {
    createData,
    getCompanies,
    getProducts,
    getProduct,
    getQuaterlyResult,
    getContactDetails,
    addSupplier,
    changeContactNumber,
    deleteSupplier,
};