

class Payment {
    public process(): string {
        return `Payment processed`;
    }

    public refund() {
        throw new Error('Refund not available');
    }
}


class CreditCardPayment extends Payment {
    public refund() {
        return `Refund processed`;
    }

    public process(): string {
        return `Credit card payment processed`;
    }
}

class PaypalPayment extends Payment {
    public process(): string {
        return `Paypal payment processed`;
    }
    public refund() {
        return `Refund processed`;
    }
}

const handlePayment = (payment: Payment) => {
    console.log(payment.process());
    console.log(payment.refund());
}

const creditCard = new CreditCardPayment();

handlePayment(creditCard);