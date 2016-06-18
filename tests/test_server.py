from server import application
import json
import unittest

class FlaskTest(unittest.TestCase):
    def setUp(self):
        application.config['TESTING'] = True
        self.app = application.test_client()

    def test_simple(self):
        res = self.app.get('/http://orig09.deviantart.net/3864/f/2016/150/5/4/get_lost_in_autumn_by_nelleke-da4b0w1.png')
        data = json.loads(res.data.decode('ascii'))
        self.assertEqual(data['colour'], '#9d663f')
