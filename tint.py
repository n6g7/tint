from PIL import Image
import binascii
import requests

PALETTE_SIZE = 3
PIXEL_SIZE = 3
WHITE_THRESHOLD = 230

def rstrip(lst, x):
    '''Right-strips a list'''
    concat = '-'.join([str(a) for a in lst])
    clean_concat = concat.rstrip('-%s' % x)
    return [int(s) for s in clean_concat.split('-')]

def get_colours(palette):
    '''Returns a list of all the colours in a palette'''

    # A pixel has to have 3 channels
    while len(palette) % PIXEL_SIZE != 0:
        palette.append(0)

    for i in range(0, len(palette), PIXEL_SIZE):
        px = tuple(palette[i:i+PIXEL_SIZE])
        yield px

def tint(image):
    '''Returns a image's main colour'''
    image = image.quantize(PALETTE_SIZE)
    palette = rstrip(image.getpalette(), 0)

    last_pixel = None

    pixels = get_colours(palette)
    for px in pixels:
        last_pixel = px
        a = sum(px)/len(px)
        if a < WHITE_THRESHOLD:
            return px

    return last_pixel

def from_url(url, params={}):
    data = requests.get(url, params=params, stream=True).raw
    img = Image.open(data)
    return tint(img)

def to_hex(colour):
    sum = colour[0] * 16**4 + colour[1] * 16**2 + colour[2]
    hexed = hex(sum)[2:]
    return '#%s' % hexed.zfill(6)
