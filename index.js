const bcrypt = require('bcrypt')

class Block {
    constructor(blockid,  previousHash, data) {
        this.blockid = blockid;
        this.timestamp = Date.now();
        this.blockhash = this.getHash();
        this.prevHash = previousHash;
        this.data = data;
    }
    getHash() {
        return bcrypt.hashSync(String(this.blockid + this.timestamp + this.blockhash + this.previousHash + JSON.stringify(this.data)) , 10)
    };
}

class BlockChain {
    constructor() {
        this.chain = [];
    }
    addBlock(data){
        let blockid = this.chain.length;
        let previousHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].blockhash : ''; 
        let block = new Block(blockid, previousHash, data);
        this.chain.push(block);
    }
    viewBlock(index) {
        console.log(JSON.stringify(this.chain[index].data.patientDetails, null, 6));
        this.chain[index].data.history.push({dateAccessed: Date.now(), whoAccessed: "Dr. Marie Rose", action: "View"})
    }
}

const PatientHistory = new BlockChain();
 
PatientHistory.addBlock({
    healthCard: "4555-152-333-XD", 
    patientDetails: {
        firstName: "Jane",
        lastName: "Williams",
        sex: "Female",
        dateOfBirth: "01/01/1960",
        phone: "9055553116",
        email: "jane.williams2004@gmail.com",
        homeAddress: "12 Heaven St. ON 1N1 2R2 ",
        insuranceProvider: "Sunlife",
        insurancePolicyNumber: "356M59557",
        familyDoctorName: "Dr. Marie Rose",
        familyDoctorPhone: "4165553324",
        emergencyContactName: "Jake Williams",
        emergencyContactPhone: "4164445555"
    },
    history: [ {dateAccessed: "19/02/2021", whoAccessed: "Dr. Marie Rose", action: "View"},
                    {dateAccessed: "03/01/2021", whoAccessed: "Dr. Marie Rose", action: "View"},
                    {dateAccessed: "17/10/2020", whoAccessed: "Dr. Marie Rose", action: "View"} ],
});
PatientHistory.addBlock({healthCard: "4555-423-332-JD",
    patientDetails: {
        firstName: "Martin",
        lastName: "DeGuzman",
        sex: "Male",
        dateOfBirth: "12/04/1983",
        phone: "4165553577",
        email: "martin.deguzman@hotmail.com",
        homeAddress: "123 Sesame St. ON 4W3 2G6",
        insuranceProvider: "Sunlife",
        insurancePolicyNumber: "356M545668",
        familyDoctorName: "Dr. Jonathan Wick",
        familyDoctorPhone: "4165552569",
        emergencyContactName: "Jenny DeGuzman",
        emergencyContactPhone: "4164445555"
    },
    history: [ {dateAccessed: "19/02/2021", whoAccessed: "Dr. Marie Rose", action: "View"}]
});
PatientHistory.addBlock({healthCard: "6555-362-486-XD",
    patientDetails: {
        firstName: "David",
        lastName: "Cook",
        sex: "Male",
        dateOfBirth: "12/20/1980",
        phone: "6478889009",
        email: "dc_notacook@gmail.com",
        homeAddress: "179 Co Rd 3, Fleischmanns, NY 12430, USA",
        insuranceProvider: "Desjardins",
        insurancePolicyNumber: "DRCKPO0099",
        familyDoctorName: "Dr. Burg MacDonald",
        familyDoctorPhone: "4161112424",
        emergencyContactName: "Rachel Stump",
        emergencyContactPhone: "9058784657"
    },
    history: [ {dateAccessed: "19/02/2021", whoAccessed: "Dr. Marie Rose", action: "View"}],
});

// Demo
console.log("====== DISPLAYING THE ENTIRE BLOCKCHAIN =============");
console.log(JSON.stringify(PatientHistory, null, 6));
console.log("====== VIEWING JANE'S PATIENT DATA ==================");
PatientHistory.viewBlock(0);
console.log("====== VIEWING THE UPDATED TRANSACTION HISTORY ======");
console.log(JSON.stringify(PatientHistory, null, 6));