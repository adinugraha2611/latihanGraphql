// -----------BEGINNING OF HTML SCRIPTS-----------//

// calling HTML elements and set them into variables
const textInput = document.getElementById('text-input')
const convertButton = document.getElementById('convert-button')
const brailleOutput = document.getElementById('braille')
// set default textInput value
textInput.value = 'ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلۡحَىُّ ٱلۡقَيُّومُ‌ۚ لَا تَأۡخُذُهُ ۥ سِنَةٌ۬ وَلَا نَوۡمٌ۬‌ۚ لَّهُ ۥ مَا فِى ٱلسَّمَـٰوَٲتِ وَمَا فِى ٱلۡأَرۡضِ‌ۗ مَن ذَا ٱلَّذِى يَشۡفَعُ عِندَهُ ۥۤ إِلَّا بِإِذۡنِهِۦ‌ۚ يَعۡلَمُ مَا بَيۡنَ أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡ‌ۖ وَلَا يُحِيطُونَ بِشَىۡءٍ۬ مِّنۡ عِلۡمِهِۦۤ إِلَّا بِمَا شَآءَ‌ۚ وَسِعَ كُرۡسِيُّهُ ٱلسَّمَـٰوَٲتِ وَٱلۡأَرۡضَ‌ۖ وَلَا يَـُٔودُهُ ۥ حِفۡظُهُمَا‌ۚ وَهُوَ ٱلۡعَلِىُّ ٱلۡعَظِيمُ'

// -----------END OF HTML SCRIPTS-----------
// -----------BEGINNING OF CONVERTER SCRIPTS-----------
// define a variable to store the result
let arab

// create an object  to store all arab characters and its conversion values.
const arToBraille = {
  huruf: {
    '\u0627': '\u2801', /*alif */ '\u0628': '\u2803', /*b */ '\u062a': '\u281e', /*t */ '\u062b': '\u2839', /*ts rhingan */ '\u062c': '\u281a', /*j */ '\u062d': '\u2831', /*kh ringan */ '\u062e': '\u282d', /*kho */ '\u062f': '\u2819', '\u0630': '\u282e', /*ż */ '\u0631': '\u2817', /*r */ '\u0632': '\u2835', /*z */ '\u0633': '\u280e', /*s */
    '\u0634': '\u2829', /*sy */ '\u0635': '\u282F', /*shod */ '\u0636': '\u282B', /*dhod */ '\u0637': '\u283E', /*thot */ '\u0638': '\u283F', /*dhod */ '\u0639': '\u2837', /*‘ain */ '\u063a': '\u2823', /*gh */
    '\u0641': '\u280b', '\u0642': '\u281f', /*q */ '\u0643': '\u2805', /*k */ '\u0644': '\u2807', /*l */ '\u0645': '\u280d', /*m */ '\u0646': '\u281d', /*n */ '\u0647': '\u2813', /*h */ '\u0648': '\u283a', /*w */ '\u064a': '\u280a', /*y */
    '\u0623': '\u280c', /*أ hamzah atas alif */ '\u0626': '\u283D', /*ئ */ '\u0624': '\u2833', /*ؤ */
    '\u0625': '\u280c', /*إ, hamzah bawah alif */
    '\u0621': '\u2804', /*hamzah berdiri sendiri ء */
    '\u0629': '\u2821',	// ta marbuttah
    '\u0671': '\u0671',	// ٱ alif wasal jadi alif biasa
    '\u0649': '\u2815', // alif maksura, baca panjang
    'lamAlif': '\u2827', // lam alif ⠧
    '\u0654' : '\u2804', // hamzah ngambang ٔ
    '\u06c1' : '\u2813', // H utsmani
    'hamzahMad' : '\u281c', // ⠜ 
  },
  tandaHidup: {
    '\u0670': '\u2808',	// tanda alif kecil di atas.
    '\u064E': '\u2802', // fathah
    '\u064F': '\u2825',	// dhommah
    '\u0650': '\u2811', // kasrah
    '\u0657': '\u282C', // dhommah terbalinda ٖ
    '\u0656': '\u2818', // kasrah tegak
    '\u064b': '\u2806', // fathatain
    '\u064d': '\u2814', // kasratain
    '\u064c': '\u2822', // dhommatain
    '\u0653': '\u282a', // ٓ, bendera tanda harakat panjang.
    '\u06e4': '\u282a', // sama seperti bendera panjang
    '\u06e6': '\u2818' // sma seperti kasrah tegak
  },
  tandaMati: {
    '\u0652': '\u2812',	// sukun
    '\u0651': '\u0651',	// tasydid. Tidak diganti untuk mengindari tympang tindih penggantian tasydid.
    '\u06e1': '\u2812' // sukun utsmani
  },
  charsTanpaBraille: {	// menampung simbol arab yang tidak ada simbol braille nya.
    // '\u0640' : '', // tanda tatwil: tanda hubung untuk memanjangkan jarak antar lafadz
    '\u06ec': '', // biasa muncul setelah tanwin.
    // ' \u06e5' : 'u\u282c', // sama seperti dhommah terbalik.
    '\u200c': '' // space sebelum waqaf
  },
  get semuaHuruf() {
    let str = '(['
    for (const key in this.huruf) {
      str += this.huruf[key]
    }
    str += '])'
    return str
  },
  get semuaTandaBaca() {
    let str = '(['
    for (const key in this.tandaHidup) {
      str += this.tandaHidup[key]
    }
    for (const key in this.tandaMati) {
      str += this.tandaMati[key]
    }
    str += '])'
    return str
  },
  get semuaTandaHidup() {
    let str = '(['
    for (const key in this.tandaHidup) {
      str += this.tandaHidup[key]
    }
    str += '])'
    return str
  },
  get semuaTandaMati() {
    let str = '(['
    for (const key in this.tandaMati) {
      str += this.tandaMati[key]
    }
    str += '])'
    return str
  }
}

// set all get methods to be non-enumerable to avoid them from being looped in convert.roughConvertion() function
Object.defineProperties(arToBraille, {
  semuaHuruf: { enumerable: false },
  semuaTandaBaca: { enumerable: false },
  semuaTandaHidup: { enumerable: false },
  semuaTandaMati: { enumerable: false }
})

// create a static class to store all convert functions
class convert {
  static convertFunction() {
    for (const item of this.regExpCombination) {
      console.log(this.methodName + ' found: ' + arab.match(item.regex))
      arab = arab.replace(item.regex, item.replacer)
    }
  }

  static roughConvertion() {
    let allChars = ''
    for (const props in arToBraille) {
      // concat all keys and separate them by '|'
      allChars += Object.keys(arToBraille[props]).join('|')
      allChars += '|'
    }
    // remove the last '|' character.
    allChars = allChars.slice(0, -1)
    // add unregistered chars into temp for debugging purpose
    let temp = new Set()
    const tempChars = arab.match(new RegExp('[^' + allChars + ']', 'g'))
    if (tempChars) {
      for (let char of tempChars) {
        temp.add(char)
      }
    } 
    
    // begin the rough convertion
    arab = arab.replace(new RegExp(allChars, 'g'), function(matched) {
      for (const props in arToBraille) {
        if (arToBraille[props][matched] !== undefined) {
          return arToBraille[props][matched]
        } else {
          continue
        }
      }
    })
    console.log('Unprocessed chars: ', temp)
  }

  static tasydid() {
    this.methodName = 'tasydid'
    this.regExpCombination = [
      {
        regex: new RegExp(arToBraille.semuaHuruf + '\u0651' + arToBraille.semuaTandaHidup, 'g'),
        replacer: '\u2820$1$2'
      },
      {
        regex: new RegExp(arToBraille.semuaHuruf + '\u2811\u0651', 'g'),
        replacer: '\u2820$1\u2811'
      }	// ini untuk bentuk kasrah yang dibawah tasydid
    ]
    this.convertFunction()
  }

  static lamAlif() {
    // di run setelah tasydid()
    this.methodName = 'lamAlif'
    this.regExpCombination = [
      {
        // lam + fathah (optional) + alif/hamzah alal alif + bendera(optional)
        regex: new RegExp('\u2807\u2802\u2801(\u282a)?', 'g'),
        // menjadi: lamAlif + tanda bendera (kalo ada)
        replacer: '\u2827$1'
      },
      {
        // lam + fathatain + alif
        regex: new RegExp('\u2807\u2806\u2801(\u282a)?', 'g'),
        // menjadi: lamAlif + fathatain + tanda bendera (kalo ada)
        replacer: '\u2827\u2806$1'
      }
    ]
    this.convertFunction()
  }

  static mad() {
    // run setelah checkWassal
    this.methodName = 'mad'
    this.regExpCombination = [
      {
        // jika fathah ketemu alif
        // tanda %m  pada replacer dipakai sebagai marker untuk memudahkan proses debugging.
        regex: new RegExp('\u2802\u2801', 'g'),
        replacer: '\u2801'
      },
      {
        // jika kasrah ketemu alif maksuro
        regex: new RegExp('\u2811\u2815', 'g'),
        replacer: '%m\u2815'
      },
      {
        // dhommah + waw + sukun(optional) + spasi(optional) + huruf minimal 1
        regex: new RegExp('\u2825\u283a\u2812?( )?' + arToBraille.semuaHuruf + '+', 'g'),
        replacer: '%m\u283a$1$2'
      },
      {
        // kasrah + ya + sukun(optional) + spasi(optional) + huruf minimal 1
        regex: new RegExp('\u2811\u280a\u2812?( )?' + arToBraille.semuaHuruf + '+', 'g'),
        replacer: '%m\u280a$1$2'
      },
      {
        // mengubah hamzah + fathah + alif jadi hamzah mad (⠜)
        regex : new RegExp('\u2804\u2801|\u280c\u2808', 'g'),
        replacer : '\u281c'
      } 
    ]
    this.convertFunction()
  }

  static checkWassal() {
    // run setelah lamAlif()
    // untuk mendeteksi wassal pada quran Kemenag.
    this.methodName = 'check Wassal'
    this.regExpCombination = [
      {
        // alif + tanda? + huruf? + tandaMati
        regex: new RegExp('\u2801' + arToBraille.semuaTandaHidup + '?' + arToBraille.semuaHuruf + '?' + arToBraille.semuaTandaMati, 'g'),
        replacer: '\u0671$1$2$3'
      },
      {
        // ini untuk mengubah alif yang bertanda menjadi hamzah alal alif (kemenag)
        // tanda %h pada replacer hanya untuk mempermudah proses debugging.
        //  alif + tanda hidup 
        regex: new RegExp('\u2801' + arToBraille.semuaTandaHidup, 'g'),
        replacer: '\u280c$1'
      },
      {
        // mengubah wassal/hamzah alal alif yang bertemu tanda bendera menjadi alif mad
        regex: new RegExp('[\u280c\u0671]\u282a', 'g'),
        replacer: '\u2801\u282a'
      }
    ]
    this.convertFunction()
  }

  static utsmaniSymbols() {
    // run sebelum tasydid
    this.methodName = 'utsmani symbols'
    this.regExpCombination = [
      {
        // tanda harakat + tanda hubung + tanda harakat (biasanya tanda harakat panjang)
        regex: new RegExp(arToBraille.semuaTandaHidup + '[\u0640\u066e]' + arToBraille.semuaTandaHidup, 'g'),
        replacer: '$2'
      },
      {
        // kasrah + symbol kasrah tegak.
        regex: new RegExp('\u2811\u2818', 'g'),
        replacer: '\u2818'
      },
      {
        // tanda hidup + tanda hubung + bukan tanda hidup (huruf)
        regex: new RegExp(arToBraille.semuaTandaHidup + '\u0640([^' + arToBraille.semuaTandaHidup.substring(2, arToBraille.semuaTandaHidup.length), 'g'),
        replacer: '$1$2'
      },
      {
        regex: new RegExp('\u2825 \u06e5', 'g'),
        replacer: '%u\u282c'
      },
      {
        regex: new RegExp('\u2802\u0672', 'g'),
        replacer: '%u\u2808'
      },
      {
        // ini untuk merubah alif maksuro yang dipakai seperti huruf 'ya' pada script Utsmani.
        // bukan kasrah + alif maksuro + tanda mati
        regex : new RegExp('([^\u2811])\u2815' + arToBraille.semuaTandaMati, 'g'),
        replacer : '$1%y\u280a$2'
      },
      {
        // masih sama seperti yang diatas.
        // kasrah + alif maksuro + tasydid
        regex : new RegExp('\u2811\u2815\u0651', 'g'),
        replacer : '%y\u2811\u280a\u0651',
      }
    ]
    this.convertFunction()
  }

  static removeMarkers() {
    // run paling akhir
    arab = arab.replace(/%\w/g, '')
    arab = arab.replace(/\u0671/g, '\u2801')
  }
  
  static newLineToBreak() {
    // biar line space di inputan textarea ngikut
    arab = arab.replace(/ ?[\n] ?/g, '<br />')
  }

  static runIt() {
    // store textInput into arab variable
    arab = textInput.value
    // run all methods in sequence
    convert.newLineToBreak()
    convert.roughConvertion()
    convert.utsmaniSymbols()
    convert.tasydid()
    convert.lamAlif()
    convert.checkWassal()
    convert.mad()
    convert.removeMarkers()

    // show the result inside brailleOutput div
    brailleOutput.innerHTML = arab
  }
}

// set convertButton click event.
convertButton.onclick = convert.runIt

// tambah removeMarkers()
