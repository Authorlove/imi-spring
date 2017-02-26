/**
* 
* 所有黄金令箭打点
*/
function goldlogger(apname, key, secretString) {
	function record(){
		window.goldlog ? goldlog.record("/"+apname, '', key, secretString) : setTimeout(record, 200);
	}
    record();
}
module.exports = {
    goldlogger
};