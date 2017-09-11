from flask import Flask
from flask import request

app = Flask(__name__)
port = 5000
debug = True
host = '0.0.0.0'

# Default
@app.route('/')
@app.route('/add')
def catch_all():
    return '383EE'

# # id
# @app.route('/get/id', methods=['GET'])
# def get():
#     if 'id' in request.args:
#         return getlib.getByIdFull(request.args['id']) if 'full' in request.args else getlib.getById(request.args['id'])
#     elif 'ids' in request.args:
#         return getlib.getByIdsFull(request.args['ids']) if 'full' in request.args else getlib.getByIds(request.args['ids'])
#     else:
#         pass

# # action
# @app.route('/get/action', methods=['GET'])
# def getAction():
#     return getlib.getActionFull() if 'full' in request.args else getlib.getAction()

# # new
# @app.route('/get/new', methods=['GET'])
# def getNew():
#     return getlib.getNewFull() if 'full' in request.args else getlib.getNew()

# # all
# @app.route('/get/all', methods=['GET'])
# def getAll():
#     return getlib.getAllFull() if 'full' in request.args else getlib.getAll()

if __name__ == '__main__':
    app.debug = debug
    app.run(host=host, port=port)