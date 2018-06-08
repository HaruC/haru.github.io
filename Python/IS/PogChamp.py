# Автор: Яковлев Игорь
# Факультет: ИВТ Курс: 4

"""
    Данный файл реализует кодирование/декодирование по следующим алгоритмам:
        Фибоначчи
        Хаффмана
        Голомба
        Левенштейна
        Райса
        Ивэн-Родэ
        Элиаса
        Стоп-шаг кода
        Унарного кода
"""

from math import log, floor
from heapq import heappush, heappop, heapify


def encode_huffman(object):
    """
    Huffman encode the given dict mapping symbols to weights

    :param object: Integer
    :return: Dict(number: Integer, huffman_code: Binary String)
    """
    weight = list()
    for i in range(object):
        weight.append(1)
    kappa = dict(zip(range(object)[::-1], weight))
    heap = [[wt, [sym, ""]] for sym, wt in kappa.items()]
    heapify(heap)
    while len(heap) > 1:
        lo = heappop(heap)
        hi = heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    val = sorted(heappop(heap)[1:], key=lambda p: (len(p[-1]), p))
    numbers, values = [], []
    for p in val:
        numbers.append(p[0])
        values.append(p[1])
    return dict(zip(sorted(numbers), values))


def unary(number):
    """
    Unary cipher for integer

    :param number: Integer
    :return: String
    """
    return str(1) * number + '0'


def logarithmic():
    """
    Helper function

    :return: Dict(key, value)
    """
    integer = 0
    power = list()
    while integer < 2 ** 65535:
        integer = 2 ** integer
        power.append(integer - 1)
    return dict(zip(range(6), power))


def floor_log(integer):
    """
    Helper function

    :param integer: Positive Integer
    :return: Integer
    """
    return floor(log(integer, 2))


def fibonacci_series(number):
    """
    Fibonacci series

    :param number: Integer
    :return: List with values
    """
    n = 0
    a, b = 1, 2
    res = [a, b]
    while number > n:
        a, b = b, a + b
        res.append(b)
        n += 1
    return res


def encode_gamma_lev(number):
    """
    Levenshtein gamma cipher

    :param number: Positive Integer
    :return: Binary String
    """

    return ''.join(
        [ch if (i == len(bin(number)[2:]) - 1) else '0{}'.format(ch) for i, ch in enumerate(bin(number)[2:][::-1])])


def decode_gamma_lev(binary):
    """
    Levenshtein gamma decipher

    :param binary: Binary String
    :return: Integer
    """
    return int(''.join([ch for i, ch in enumerate(binary) if (i == (len(binary) - 1)) or (i % 2 != 0)][::-1]), 2)


def encode_gamma_elias(number):
    """
    Elias gamma code cipher

    :param number: Integer
    :return: Binary String
    """
    return ('0' * floor_log(number)) + bin(number)[2:]


def decode_gamma_elias(binary):
    """
    Elias gamma code decipher

    :param binary: Binary String
    :return: Integer
    """
    return int(binary[binary.index('1'):], 2)


def encode_omega_elias(number):
    """
    Elias omega cipher

    :param number: Natural number
    :return: Binary String
    """
    if number == 0:
        raise ValueError("Error: Bad value!")
    string = []
    binary = bin(number)[2:]
    while len(binary) - 1 >= 1:
        string.append(binary)
        binary = bin(len(binary[:len(binary) - 1]))[2:]
    return ''.join(string[::-1]) + str(0)


def decode_omega_elias(binary):
    """
    Elias omega code decipher

    :param binary: Binary String
    :return: Integer
    """
    if binary[0] == '0':
        return int(1)
    else:
        index, val = 2,0
        while len(binary)-1 > index:
            step = int(binary[val:index], 2)
            val = index
            index += step + 1
        return int(binary[val:index],2)


def encode_rodeh(number):
    """
    Even-Rodeh cipher

    :param number: Integer
    :return: Binary String
    """
    cur = bin(number)[2:]
    pos = [cur]
    if number in range(1, 4):
        return str(0)*(3 - len(bin(number)[2:])) + bin(number)[2:]
    while len(cur) > 3:
        cur = bin(len(cur))[2:]
        pos.append(cur)
    return ''.join(pos[::-1]) + str(0)


def decode_rodeh(binary):
    """
    Even-Rodeh decipher

    :param binary: Binary string
    :return: Integer
    """
    st =['001','010','011']
    t = binary[:len(binary) - 1]
    pos, this = 0, 3
    if binary in st:
        return int(binary,2)
    while pos < len(t):
        cur = t[pos:pos + this]
        pos, this = pos + this, pos + int(cur, 2)
    return int(cur, 2)


def encode_delta_elias(number):
    """
    Delta Elias cipher

    :param number: Integer
    :return: Binary String
    """
    return str(0)*(len(bin(len(bin(number)[2:]))[2:])-1) + str(1) + bin(len(bin(number)[2:]))[3:] + bin(number)[3:]


def decode_delta_elias(binary):
    """
    Delta Elias decipher

    :param binary: Binary String
    :return: Integer
    """
    return int(str(1) + binary[len(binary[:binary.index('1') + 1]) + len(binary[:binary.index('1')]):], 2)


def encode_golomb(number, order):
    """
    Golomb cipher

    :param number: Integer
    :param order: Integer
    :return: Binary String
    """
    huff = encode_huffman(order)
    for k, v in huff.items():
        if number % order == k:
            return str(1) * (number // order) + str(0) + v


def decode_golomb(binary, order):
    """
    Golombs decipher

    :param binary: Binary String
    :param order: Integer
    :return: Integer
    """
    huff = encode_huffman(order)
    for k, v in huff.items():
        if binary[binary.index('0')+1:] == v:
            return len(binary[:binary.index('0')]) * order + k


def encode_raise(number, order):
    """
    Rice cipher

    :param number: Integer
    :param order: Integer
    :return: Binary String
    """
    if order == 0:
        return unary(number // (2 ** order))
    else:
        if len(bin(number % (2 ** order))[2:]) < order:
            return unary(number // (2 ** order)) + str(0) * (order - len(bin(number % (2 ** order))[2:])) + bin(
                number % (2 ** order))[2:]
        else:
            return unary(number // (2 ** order)) + bin(number % (2 ** order))[2:]


def decode_raise(binary, order):
    """
    Rice decipher

    :param binary: Binary String
    :param order: Integer
    :return: Integer
    """
    if order == 0:
        return binary.index('0')
    else:
        return (binary.index('0')*(2**order)) + int(binary[binary.index('0'):],2)


def encode_exp_golomb(number, order):
    """
    Golomb cipher

    :param number: Integer
    :param order: Integer
    :return: Binary String
    """
    if order == 0:
        return unary(len(bin(number + 1)[2:]) - 1) + bin(number + 1)[3:]
    else:
        if len(bin(int(1 + number / 2 ** order))[2:]) > 1:
            res = unary(int(log(1 + number / 2 ** order, 2))) + bin(int(1 + number / 2 ** order))[2:][
                                                                -int(log(1 + number / 2 ** order, 2)):] + bin(number)[
                                                                                                          2:][-order:]
            if len(res) < order + 1:
                return str(0) * ((order + 1) - len(res)) + res
            else:
                return res
        else:
            res = unary(int(log(1 + number / 2 ** order, 2))) + '' + bin(number)[2:][-order:]
            if len(res) < order + 1:
                return str(0) * ((order + 1) - len(res)) + res
            else:
                return res


def decode_exp_golomb(binary, order):
    """
    Exponential Golomb decipher

    :param binary: Binary String
    :param order:
    :return: Integer
    """
    if binary.startswith('1'):
        return int(binary[:binary.index('0')] + str(0)*(len(binary[binary.index('0'):])-1 - binary[:binary.index('0')].count('1')), 2) + int(binary[binary.index('0'):], 2)
    else:
        return int(binary, 2)


def encode_fib(number):
    """
    Fibonacci cipher

    :param number: Integer
    :return: Binary String
    """
    if number == 0:
        return '01'
    elif number in fibonacci_series(100):
        return str(0) * [1 if i == number else 0 for i in fibonacci_series(100)].index(1) + str(1) * 2
    else:
        res = []
        seq = [i for i in fibonacci_series(100) if i < number][::-1]
        for ii, i in enumerate(seq):
            if ii != 1:
                res.append(number // i)
                number = number % i
            else:
                res.append(0)
        res = [str(i) for i in res]
        return ''.join(res[::-1]) + str(1)


def decode_fib(binary):
    """
    Fibonacci decipher

    :param binary: Binary String
    :return: Integer
    """
    result = 0
    check = zip(fibonacci_series(1000), [i for i in binary[:len(binary) - 1]])
    for k, v in check:
        if v == '1':
            result += k
    return result


def encode_levenshtein(number):
    """
    Levenshtein cipher

    :param number: Integer
    :return: Binary String
    """
    lsit = list()
    middles = floor_log(number)
    for k, v in logarithmic().items():
        if number > v:
            head = k
    while middles > 0:
        lsit.append(bin(middles)[3:])
        middles = floor_log(middles)
    return str(1) * (head + 1) + str(0) + ''.join(lsit[::-1]) + bin(number)[3:]

def decode_levenshtein(binary):
    """
    Levenshtein decipher

    :param binary: Binary String
    :return: Integer
    """
    if binary == '10':
        return int(1)
    else:
        middles, ind = 1, 0
        pref = binary[:binary.index('0')].count('1')-1
        while pref >= 0:
            temp = binary[binary.index('0')+1+ind:binary.index('0')+1+middles]
            ind = middles
            middles += int(str(1) + temp, 2)
            pref -=1
            if pref == 0:
                return int(str(1) + temp, 2)


def encode_sss(i, j, k):
    """
    Start-Step-Stop cipher

    :param i: Integer
    :param j: Integer
    :param k: Integer
    :return: Dict(:number: Integer, :string: Binary
    """
    vars = [i]
    whole, pending = '', 0
    end, ranges = list(), list()
    k_ind = int((k - i) / j + 1)
    for c in range(1, k_ind):
        vars.append(i + c * j)
    for i in range(len(vars)):
        pending += 2 ** vars[i]
        if i == 0:
            ranges.append([1, pending])
        elif i == len(vars) - 1:
            whole = [1, pending]
            ranges.append([pending - 2 ** vars[i] + 1, pending])
        else:
            ranges.append([pending - 2 ** vars[i] + 1, pending])
    for item in range(whole[0], whole[1] + 1):
        for this in ranges:
            mantis = ranges.index(this)
            if item in range(this[0], this[1] + 1):
                res = bin(range(this[0], this[1] + 1).index(item))[2:]
                if len(res) < vars[mantis]:
                    res = unary(mantis) + str(0) * (vars[mantis] - len(res)) + bin(
                        range(this[0], this[1] + 1).index(item))[2:]
                else:
                    res = unary(mantis) + bin(range(this[0], this[1] + 1).index(item))[2:]
                end.append(res)
    return dict(zip(range(whole[0], whole[1] + 1), end))


def decode_sss(i, j, k, binary):
    """
    Start-Step-Stop decipher
    :param i:
    :param j:
    :param k:
    :param binary: Binary String
    :return: Integer
    """

    vars = [i]
    res, pending = 0, 0
    ranges = list()
    k_ind = int((k - i) / j + 1)
    for c in range(1, k_ind):
        vars.append(i + c * j)
    for i in range(len(vars)):
        pending += 2 ** vars[i]
        if i == 0:
            ranges.append([1, pending])
        elif i == len(vars) - 1:
            ranges.append([pending - 2 ** vars[i] + 1, pending])
        else:
            ranges.append([pending - 2 ** vars[i] + 1, pending])
    pref = binary[:binary.index('0')].count('1')+1
    sss = binary[binary.index('0'):binary.index('0')+(i+(pref-1)*j)]
    for i, ii in enumerate(ranges):
        if i == pref-1:
            res = int(sss, 2) + ii[0]
    return res
