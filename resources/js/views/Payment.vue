<template>
<div class="flex justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-8">

<!-- Component Start -->
<div class=" w-full max-w-screen-lg">
    <div class="lg:col-span-2">
        <h2 class="text-sm font-medium">Payment Method</h2>
        <div class="bg-white rounded mt-4 shadow-lg">
            <div class="flex items-center px-8 py-5">
                    <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" :class="{ 'bg-blue-600': checkedGroupVModel === 'Payment on delivery' }" id="check_cart1" value="Payment on delivery" name="vModelGroup" type="radio" v-model="checkedGroupVModel">
                    <label class="text-sm font-medium ml-4">Payment on delivery</label>
            </div>
            <div class="flex items-center px-8 py-5">
                    <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" :class="{ 'bg-blue-600': checkedGroupVModel === 'PayPal' }" id="check_cart1" value="PayPal"  name="vModelGroup" type="radio" v-model="checkedGroupVModel">
                    <label class="text-sm font-medium ml-4">PayPal</label>
            </div>
            <div class="border-t">
                <div class="flex items-center px-8 py-5">
                    <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" :class="{ 'bg-blue-600': checkedGroupVModel === 'Credit Card' }" id="check_cart2" value="Credit Card" name="vModelGroup" type="radio" v-model="checkedGroupVModel">
                    <label class="text-sm font-medium ml-4">Credit Card</label>
                </div>
                <div class="grid grid-cols-2 gap-4 px-8 pb-8">
                    <div class="col-span-2">
                        <label class="text-xs font-semibold" for="cardNumber">Card number</label>
                        <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" type="text" placeholder="0000 0000 0000 0000">
                    </div>
                    <div class="">
                        <label class="text-xs font-semibold" for="cardNumber">Expiry Date</label>
                        <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" type="text" placeholder="MM/YY">
                    </div>
                    <div class="">
                        <label class="text-xs font-semibold" for="cardNumber">CVC/CVV</label>
                        <input class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm" type="password" placeholder="...">
                    </div>
                </div>
            </div>
            <div class="checkout">
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Check Out</button>
            </div>
        </div>
    </div>
    <div class="hidden">
        <h2 class="text-sm font-medium">Purchase Summary</h2>
        <div class="bg-white rounded mt-4 shadow-lg py-6">
            <div class="px-8">
                <div class="flex items-end">
                    <select class="text-sm font-medium focus:outline-none -ml-1" name="" id="">
                        <option value="">Product (Billed Monthly)</option>
                        <option value="">Product (Billed Annually)</option>
                    </select>
                    <span class="text-sm ml-auto font-semibold">$20</span>
                    <span class="text-xs text-gray-500 mb-px">/mo</span>
                </div>
                <span class="text-xs text-gray-500 mt-2">Save 20% with annual billing</span>
            </div>
            <div class="px-8 mt-4">
                <div class="flex items-end justify-between">
                    <span class="text-sm font-semibold">Tax</span>
                    <span class="text-sm text-gray-500 mb-px">10%</span>
                </div>
            </div>
            <div class="px-8 mt-4 border-t pt-4">
                <div class="flex items-end justify-between">
                    <span class="font-semibold">Today you pay (AUD)</span>
                    <span class="font-semibold">$0</span>
                </div>
                <span class="text-xs text-gray-500 mt-2">After 1 month free: $22/mo.</span>
            </div>
            <div class="flex items-center px-8 mt-8">
                <input id="termsConditions" type="checkbox">
                <label class="text-xs text-gray-500 ml-2" for="termsConditions">I agree to the terms and conditions.</label>
            </div>
            <div class="flex flex-col px-8 pt-4">
                <button class="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700">Start Subscription</button>
                <button class="text-xs text-blue-500 mt-3 underline">Have a coupon code?</button>
            </div>
        </div>
    </div>
</div>
<!-- Component End  -->

</div>
</template>
<script>

export default{
    name: "Payment",
    data(){
        return {
            checkedGroupVModel:'Payment on delivery',
        }
    },
    methods: {

    }
}

</script>
