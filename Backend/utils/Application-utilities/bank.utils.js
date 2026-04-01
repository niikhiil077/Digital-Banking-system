
// GENERATE BANK ACCOUNT NUMBER 

export function generateBankAccountNo() {
    // 12-digit numeric account number
    let accountNumber = '';
    for (let i = 0; i < 12; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
}






// GENERATE IFSC CODE 

export function generateIFSCCode() {
    // Format: 4 letters + 0 + 6 digits, e.g., BANK0123456
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += letters[Math.floor(Math.random() * letters.length)];
    }
    code += '0'; // reserved digit
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}






// GENERATE DEBIT CARD DETAILS

export function generateDebitCardDetails() {

    // 1. Generate Card Number 

    function generateCardNumber() {
        const bin = "4539";
        let cardNumber = bin;

        while (cardNumber.length < 15) {
            cardNumber += Math.floor(Math.random() * 10);
        }

        let sum = 0;
        let shouldDouble = true;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i]);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        const checkDigit = (10 - (sum % 10)) % 10;

        return cardNumber + checkDigit;
    }

    // 2. Generate CVV
    function generateCVV() {
        return Math.floor(100 + Math.random() * 900).toString(); // 3 digit
    }

    // 3. Generate Expiry Date 

    function generateExpiryDate() {
        const now = new Date();

        const futureYear = now.getFullYear() + Math.floor(Math.random() * 3) + 2; // 2–5 yrs
        const month = Math.floor(Math.random() * 12); // 0–11


        const expiryDate = new Date(futureYear, month + 1, 0);

        return expiryDate;
    }

    return {
        cardNo: generateCardNumber(),
        cvv: generateCVV(),
        exp: generateExpiryDate()
    };
}


// GENERATE RANDOM UPI ID

export function generateRandomUPI() {
    const bankHandles = [
        "ybl",
        "paytm",
        "okaxis",
        "oksbi",
        "okhdfcbank",
        "ibl"
    ];

    // random username (letters + numbers)
    const randomName = Math.random().toString(36).substring(2, 10);

    // pick random bank
    const randomBank = bankHandles[Math.floor(Math.random() * bankHandles.length)];

    return `${randomName}@${randomBank}`;
}

