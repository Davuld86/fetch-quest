#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")














