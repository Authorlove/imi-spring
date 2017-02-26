window.WSDKUtil = {}
WSDKUtil.htmlEncode = function(e){
        e = e.replace(/&/g, '&amp;');
        e = e.replace(/>/g, '&gt;');
        e = e.replace(/</g, '&lt;');
        e = e.replace(/"/g, '&quot;');
        e = e.replace(/'/g, '&#39;');

        return e;
};
/**
 * Created by 独鹤 on 16/1/29.
 */
(function(root){
    var Util = root.WSDKUtil,
        EmotTitle = [
            '加油', '色情狂', '委屈', '悲泣', '飞机', '生病', '不会吧', '痛哭', '怀疑', '花痴',
            '偷笑', '握手', '玫瑰', '享受', '对不起', '感冒', '凄凉', '困了', '尴尬', '生气',
            '残花', '电话', '害羞', '流口水', '皱眉', '鼓掌', '迷惑', '忧伤', '时钟', '大笑',
            '邪恶', '单挑', '大哭', '隐形人', 'CS', 'I服了U', '欠扁', '炸弹', '惊声尖叫', '微笑',
            '钱', '购物', '好累', '嘘', '成交', '红唇', '招财猫', '抱抱', '好主意', '很晚了', '收邮件',
            '举杯庆祝', '疑问', '惊讶', '露齿笑', '天使', '呼叫', '闭嘴', '小样', '跳舞', '无奈',
            '查找', '大怒', '算帐', '爱慕', '再见', '恭喜发财', '强', '胜利', '财迷', '思考', '晕',
            '流汗', '爱心', '摇头', '背', '没钱了', '惊愕', '小二', '支付宝', '鄙视你', '吐舌头',
            '鬼脸', '财神', '等待', '傻笑', '学习雷锋', '心碎', '吐', '漂亮MM', '亲亲', '飞吻', '帅哥',
            '礼物', '无聊', '呆若木鸡', '再见', '老大', '安慰'
        ],
        EmotChar = [
            { title: '加油', img: '10', code: '/:012' }, { title: '色情狂', img: '26', code: '/:015' },
            { title: '委屈', img: '47', code: '/:>_<' }, { title: '悲泣', img: '48', code: '/:018' },
            { title: '飞机', img: '97', code: '/:plane'}, { title: '生病', img: '56', code: '/:>M<'},
            { title: '不会吧', img: '40', code: '/:816'}, { title: '痛哭', img: '50', code: '/:020'},
            { title: '怀疑', img: '33', code: '/:817'}, { title: '花痴', img: '14', code: '/:814'},
            { title: '偷笑', img: '3', code: '/:815'}, { title: '握手', img: '82', code: '/:)-('},
            { title: '玫瑰', img: '84', code: '/:-F'}, { title: '享受', img: '25', code: '/:818'},
            { title: '对不起', img: '52', code: '/:819'}, { title: '感冒', img: '37', code: '/:028'},
            { title: '凄凉', img: '43', code: '/:027'}, { title: '困了', img: '44', code: '/:(Zz...)'},
            { title: '尴尬', img: '38', code: '/:026'}, { title: '生气', img: '65', code: '/:>W<'},
            { title: '残花', img: '85', code: '/:-W'}, { title: '电话' ,img: '92', code: '/:~B'},
            { title: '害羞', img: '1', code: '/:^$^'}, { title: '流口水', img: '24', code: '/:813'},
            { title: '皱眉', img: '54', code: '/:812'}, { title: '鼓掌', img: '81', code: '/:8*8'},
            { title: '迷惑', img: '29', code: '/:811'}, { title: '忧伤', img: '46', code: '/:810'},
            { title: '时钟', img: '94', code: '/:clock'}, { title: '大笑', img: '5', code: '/:^O^'},
            { title: '邪恶', img: '71', code: '/:036'}, { title: '单挑', img: '72', code: '/:039'},
            { title: '大哭', img: '49', code: '/:>O<'}, { title: '隐形人', img: '74', code: '/:046'},
            { title: 'CS', img: '73', code: '/:045'}, { title: 'I服了U', img: '51', code: '/:044'},
            { title: '欠扁', img: '62', code: '/:043'}, { title: '炸弹', img: '75', code: '/:048'},
            { title: '惊声尖叫', img: '76', code: '/:047'}, { title: '微笑', img: '0', code: '/:^_^'},
            { title: '钱', img: '88', code: '/:$'}, { title: '购物', img: '89', code: '/:%'},
            { title: '好累', img: '55', code: '/:"'}, { title: '嘘', img: '34', code: '/:!'},
            { title: '成交', img: '80', code: '/:(OK)'}, { title: '红唇', img: '83', code: '/:lip'},
            { title: '招财猫', img: '79', code: '/:052'}, { title: '抱抱', img: '9', code: '/:H'},
            { title: '好主意', img: '20', code: '/:071'}, { title: '很晚了', img: '96', code: '/:C'},
            { title: '收邮件', img: '91', code: '/:@'}, { title: '举杯庆祝', img: '93', code: '/:U*U'},
            { title: '疑问', img: '30', code: '/:?'}, { title: '惊讶', img: '59', code: '/:069'},
            { title: '露齿笑', img: '15', code: '/:^W^'}, { title: '天使', img: '22', code: '/:065'},
            { title: '呼叫', img: '17', code: '/:066'}, { title: '闭嘴', img: '61', code: '/:067'},
            { title: '小样', img: '35', code: '/:068'}, { title: '跳舞', img: '6', code: '/:081'},
            { title: '无奈', img: '41', code: '/:\'""'}, { title: '查找', img: '16', code: '/:080'},
            { title: '大怒', img: '64', code: '/:808'}, { title: '算帐', img: '18', code: '/:807'},
            { title: '爱慕', img: '4', code: '/:809'}, { title: '再见', img: '23', code: '/:804'},
            { title: '恭喜发财', img: '68', code: '/:803'}, { title: '强', img: '12', code: '/:b'},
            { title: '胜利', img: '11', code: '/:806'}, { title: '财迷', img: '19', code: '/:805'},
            { title: '思考', img: '28', code: '/:801'}, { title: '晕', img: '45', code: '/:*&*'},
            { title: '流汗', img: '42', code: '/:802'}, { title: '爱心', img: '86', code: '/:Y'},
            { title: '摇头', img: '36', code: '/:079'}, { title: '背', img: '58', code: '/:076'},
            { title: '没钱了', img: '31', code: '/:077'}, { title: '老大', img: '70', code: '/:O=O'},
            { title: '小二', img: '69', code: '/:074'}, { title: '支付宝', img: '98', code: '/:075'},
            { title: '鄙视你', img: '63', code: '/:P'}, { title: '吐舌头', img: '2', code: '/:Q'},
            { title: '鬼脸', img: '21', code: '/:072'}, { title: '财神', img: '66', code: '/:073'},
            { title: '等待', img: '95', code: '/:R'}, { title: '傻笑', img: '39', code: '/:007'},
            { title: '学习雷锋', img: '67', code: '/:008'}, { title: '心碎', img: '87', code: '/:qp'},
            { title: '吐', img: '57', code: '/:>@<'}, { title: '漂亮MM', img: '77', code: '/:girl'},
            { title: '亲亲', img: '13', code: '/:^x^'}, { title: '飞吻', img: '7', code: '/:087'},
            { title: '帅哥', img: '78', code: '/:man'}, { title: '礼物', img: '90', code: '/:(&)'},
            { title: '无聊', img: '32', code: '/:083'}, { title: '呆若木鸡', img: '27', code: '/:084'},
            { title: '再见', img: '53', code: '/:085'}, { title: '惊愕', img: '60', code: '/:O'},
            { title: '安慰', img: '8', code: '/:086'}
        ],
        EmotImgUrl = 'https://g.alicdn.com/aliww/h5-openim/0.0.1/faces/',
        emotW320 = 'https://gw.alicdn.com/tps/TB1.eFIKXXXXXbUXFXXXXXXXXXX-320-675.jpg',
        emotW640 = 'https://img.alicdn.com/tps/TB1O2CKHVXXXXbMXVXXXXXXXXXX.jpg',
        DEFAULT_CONFIG = {
            trigger: true,
            emots: EmotTitle,
            emotsImg: emotW320,
            emotSize: 45,
            row: 7,
            col: 3,
            customStyle: false,
            onEmotClick: function(){}
        };

    !root.WSDKPlgs && (root.WSDKPlgs = {});

    function Emot(){

        this.init();
    }

    Emot.prototype = {

        constructor: Emot,

        emotTitles: EmotTitle,

        emotW640: emotW640,

        emotW320: emotW320,

        init: function(){

        },


        htmlDecode: function(str){
            var obj, result = '', n;

            str = splitByEmot(str);

            str.forEach(function(v){
                if(isEmotLike(v) && (obj = getEmotObj(v))){

                    n = parseInt(obj.img) + 1;
                    n = n < 10 ? '0' + n : n;
                    n = 's0' + n + '.png';
                    result += '<img class="wsdk-emot" src="' + EmotImgUrl + n + '" alt="' + obj.title + '" />';
                }else{
                    result += Util.htmlEncode(v);
                }
            });

            return result;
        },

        /**
         * 将接收到的表情符号转换成表情图片 /:012 => 加油图片
         */
        decode: (function(){
            var reg = '',
                l = EmotChar.length;

            EmotChar.forEach(function(emot){
                reg += '|' + emot.code.substring(2);
            });

            reg = reg.substring(1); // 去掉第一个 |
            reg = reg.replace(/([\^?()\.\*\$])/g, '\\$1'); // 转义特殊字符
            reg = new RegExp('\/:(' + reg + ')', 'g');

            return function(content){
                if(content){
                    content = content.replace(reg, function(key) {
                        var emot = false,
                            title = '';

                        for(var i = 0; i < l; i++){
                            if(EmotChar[i].code == key){
                                emot = EmotChar[i].img;
                                title = EmotChar[i].title;
                                break;
                            }
                        }

                        if (emot) {

                            key = '[' + title + ']';
                        }
                        return key;
                    });
                }

                content = this.htmlDecode(content);

                return content;
            }
        })(),

        isEmot: isEmot,

        isEmotLike: isEmotLike,

        splitByEmot: splitByEmot
    };

    root.WSDKPlgs.Emot = Emot;

    /**
     * 讲聊天内容按 类似表情([中文]) 分割
     * @param content
     * @returns {Array|*}
     */
    function splitByEmot(content){
        content = content.replace(/\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi, "@#[$1]@#");

        return content.split('@#');
    }

    /**
     * 是否为类似表情([中文])
     * @param str
     * @returns {boolean}
     */
    function isEmotLike(str){
        return /\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi.test(str);
    }

    function getEmotObj(emot){
        var f = emot.replace('[', '').replace(']', '');

        var isEmot = null;

        for(var i = 0, l = EmotChar.length; i < l; i++){
            if(EmotChar[i].title == f){
                isEmot = EmotChar[i];
                break;
            }
        }

        return isEmot;
    }

    /**
     * 是否为表情
     * @param emot
     * @returns {boolean}
     */
    function isEmot(emot){

        var o = getEmotObj(emot);

        return o.code;
    }

    /**
     * 按固定的行列,分割默认表情,以便渲染
     * @param emotTitles
     * @param col
     * @param row
     * @returns {Array}
     */
    function sliceEmot(emotTitles, col, row){
        var c = col * row,
            emots = [],
            k = 0, n = 0;

        emotTitles.forEach(function(emot){
            (k == c) && (k = 0);
            (k == 0) && (emots[n++] = []);
            if(k < c){
                k++;
                emots[n-1].push(emot);
            }
        });

        return emots;
    }

})(this);