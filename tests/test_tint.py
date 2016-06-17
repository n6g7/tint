from tint import rstrip, get_colours, to_hex
import unittest

class TestRstrip(unittest.TestCase):
    def test_simple(self):
        result = rstrip([1,2], 0)
        self.assertEqual(result, [1,2])

    def test_simple2(self):
        result = rstrip([1,2,3,3], 3)
        self.assertEqual(result, [1,2])

    def test_simple3(self):
        result = rstrip([0,0,1,2], 0)
        self.assertEqual(result, [0,0,1,2])

class TestGetColours(unittest.TestCase):
    def test_simple(self):
        result = [x for x in get_colours([1,2,3,4,5,6])]
        self.assertEqual(result, [(1,2,3), (4,5,6)])

    def test_failure(self):
        result = [x for x in get_colours([1,2,3,4])]
        self.assertEqual(result, [(1,2,3), (4,0,0)])

class TestHex(unittest.TestCase):
    def test_simple(self):
        result = to_hex((0,0,0))
        self.assertEqual(result, '#000000')

    def test_simple2(self):
        result = to_hex((255,255,255))
        self.assertEqual(result, '#ffffff')

    def test_simple2(self):
        result = to_hex((255,0,128))
        self.assertEqual(result, '#ff0080')
