/* --- Backend node.js code --- */

/* --- DEPENDENCIES --- */
const Web3 = require('web3');
const BN = require('bignumber.js');
// const io = require('socket.io-client');

//settings
var rpc_api_provider = 'https://api.mycryptoapi.com/eth';
var old_contract = '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819';
var old_contract_abi = [{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"}],"name":"trade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"order","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"amountFilled","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeRebate_","type":"uint256"}],"name":"changeFeeRebate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"},{"name":"sender","type":"address"}],"name":"testTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeRebate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"accountLevelsAddr_","type":"address"}],"name":"changeAccountLevelsAddr","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"accountLevelsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"availableVolume","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"accountLevelsAddr_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"},{"name":"feeRebate_","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}];
// TEMP: Test user_addr from J.
// var user_address = '0xa83adca55ce5d0cc43ba16f4247ca65229a1bfb1';
// TODO: Get user_address ?from metamask?
var user_address = '0x5902fcFA445E0E78Ab20C394a561292353610774';

function get_JSON(url){
    var value= $.ajax({
        url: url,
        async: false
    }).responseText;
    return value;
}
// var tokens = JSON.parse(get_JSON('https://raw.githubusercontent.com/forkdelta/forkdelta.github.io/master/config/main.json')).tokens;
var tokens = JSON.parse('{"tokens": [' +
    '{"addr": "0x0000000000000000000000000000000000000000", "name": "ETH", "decimals": 18},' +
    '{"addr": "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374", "name": "VERI", "decimals": 18},' +
    '{"addr": "0x014b50466590340d41307cc54dcee990c8d58aa8", "name": "ICOS", "decimals": 6}' +
    ']}').tokens;
// var tokens_short = ["0x0000000000000000000000000000000000000000","0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374","0x009e864923b49263c7f10d19b7f8ab7a9a5aad33","0x00a0cbe98e4d110b0fa82646152d77babf2951d0"];

//-- init fetching orders and balances --
var web3 = new Web3(new Web3.providers.HttpProvider(rpc_api_provider));

var ED_contract = web3.eth.contract(old_contract_abi);
var ED = ED_contract.at(old_contract);
//
// // var FD = io("https://api.forkdelta.com/");
// // FD.connect();
// //
// // FD.on('connect', function(data) { console.log('connected'); });
// // FD.on('disconnect', function(data) { console.log('disconnected'); });
//
//return vars
var balances = {};
var orders = {
    sells:[],
    buys:[]
};

//get user balances for tokens
function get_balances(user, tokens) {
    tokens.forEach(function(token){
        var big_number = ED.balanceOf(token['addr'], user)['c']; //grab balance from ED contract
        big_number = new BN(big_number.join('')); // If balances return a split integer, join it into single value


        var token_decimals = token['decimals'];
        balances[token['addr']] = big_number_to_decimal(big_number, token_decimals);


        console.log(big_number.toString());
        console.log(balances[token['addr']].toString())

    });
}

//--- get balances  ---
get_balances(user_address, tokens);

//--- utils ---
/* Converts the big number stored in eth contracts to its user-friendly decimal equivalent */
function big_number_to_decimal(big_number, token_decimals) {
    return big_number.dividedBy(Math.pow(10, token_decimals));
}

//gets the token decimals from contract ABI
function get_token_decimals(token_address) {
    if (token_address = '0x0000000000000000000000000000000000000000') return 18;

    var decimalsCall = {
        to: token_address,
        data: web3.sha3('decimals()').substring(0,10)
    };

    // Parse returned hex into integer
    return parseInt(web3.eth.call(decimalsCall));
}

/* -- Frontend JS -- */
var ED_balances = $('#ED-migration-balances');

// --- multiselect customization ---
ED_balances.multiSelect({
    selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='search token'>",
    selectionHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='search token'>",
    selectableFooter: "<div class='ED-ms-header'>EtherDelta Balances<p>Current</p></div>",
    selectionFooter: "<div class='ED-ms-header'>ForkDeltaBalances<p>After Transfer</p></div>",
    afterInit: function(ms){
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
            selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
            .on('keydown', function(e){
                if (e.which === 40){
                    that.$selectableUl.focus();
                    return false;
                }
            });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
            .on('keydown', function(e){
                if (e.which == 40){
                    that.$selectionUl.focus();
                    return false;
                }
            });
    },
    afterSelect: function(){
        this.qs1.cache();
        this.qs2.cache();
    },
    afterDeselect: function(){
        this.qs1.cache();
        this.qs2.cache();
    }
});

$('#select-all').click(function(){
    $('#public-methods').multiSelect('select_all');
    return false;
});
$('#deselect-all').click(function(){
    $('#public-methods').multiSelect('deselect_all');
    return false;
});

// populate multiselect
var balances_added = 0;
tokens.forEach(function(token) {
    var bal = document.createElement("option");
    bal.text = token['name'] + ': ' + balances[token['addr']];
    bal.value = token['addr'];
    ED_balances.add(bal, null);
    // ED_balances.append("<option value=\"" + token['name'] + ': ' + balances[token['addr']] + "\"");

    // Update multiselect display after list has been populated
    balances_added++;
    if(balances_added === tokens.length) {
        ED_balances.multiSelect('refresh');
    }
});

