from flask import Flask, escape, request, jsonify
import json
from DB import DB

app = Flask(__name__)
database = DB()

@app.route('/createa', methods=['POST'])
def create():
    req_json = request.json
    user_mail = req_json['userMail']

    tool_name = req_json['toolName']
    description = req_json['description']
    developer = req_json['developer']
    website = req_json['website']
  
    features = req_json['features']
    categories = req_json['categories']
    
    hor_scal = req_json['horizontalScalability']
    multi_struc = req_json['multiStructuredData']
    low_lat_pro = req_json['lowLatencyProcessing']
    r_time_pro = req_json['realTimeProcessing']

    database.create_toola(user_mail, tool_name, description, developer, website, hor_scal, multi_struc, low_lat_pro, r_time_pro, features, categories)

    return jsonify({"response": "ok"})

@app.route('/edita', methods=['POST'])
def edita():
    req_json = request.json
    user_mail = req_json['userMail']

    old_tool_name = req_json['oldToolName']
    tool_name = req_json['toolName']
    description = req_json['description']
    developer = req_json['developer']
    website = req_json['website']

    features = req_json['features']
    categories = req_json['categories']
    
    hor_scal = req_json['horizontalScalability']
    multi_struc = req_json['multiStructuredData']
    low_lat_pro = req_json['lowLatencyProcessing']
    r_time_pro = req_json['realTimeProcessing']

    database.edit_toola(user_mail, old_tool_name, tool_name, description, developer, website, hor_scal, multi_struc, low_lat_pro, r_time_pro, features, categories)

    return jsonify({"response": "ok"})

@app.route('/search', methods=['POST'])
def search():
    req_json = request.json
    search_string = req_json['searchString']
    results = database.search_tool(search_string)
    response = {"Status": "Ok" ,"resultAmount" :len(results), "results": results} 
    return jsonify(results)

@app.route('/toolInformation', methods=['POST'])
def toolInformation():
    req_json = request.json
    tool_name = req_json['name']
    user = req_json['user']
    results = database.get_information_of_tool(tool_name)
    results["isAdmin"] = database.check_admin(tool_name,user)
    return jsonify(results)


@app.route('/delete', methods=['POST'])
def delete():
    req_json = request.json
    tool_name = req_json['name']
    results = database.delete_tool(tool_name)
    response = results
    return jsonify(response)

@app.route('/allCategories', methods=['GET'])
def allCategories():
    categories = database.get_categories()
    response = {"Status": "Ok" ,"categories" :categories} 
    return jsonify(response)

@app.route('/allFeatures', methods=['GET'])
def allFeatures():
    features = database.get_features()
    response = {"Status": "Ok" ,"features" :features} 
    return jsonify(response)

@app.route('/allTools', methods=['GET'])
def get_all_tools():
    response = database.get_all()  
    return jsonify(response)

@app.route('/createRateOption', methods=['POST'])
def create_rate_option():
    req_json = request.json
    tool_name = req_json['toolName']
    tool_name_2 = req_json['toolName2']
    results = database.create_rate_option(tool_name,tool_name_2)
    # response = results
    return jsonify(results)

@app.route('/loadRateOptions', methods=['POST'])
def load_rate_option():
    req_json = request.json
    tool_name = req_json['name']
    results = database.load_rate_options(tool_name)
    print(results)
    response = results
    return jsonify(response)

@app.route('/loadRate', methods=['POST'])
def load_rate():
    req_json = request.json
    tool_name_1 = req_json['toolName1']
    tool_name_2 = req_json['toolName2']
    user = req_json['userMail']
    results = database.get_rates(tool_name_1,tool_name_2,user)
    # response = results
    return jsonify(results)

@app.route('/createRate', methods=['POST'])
def create_rate():
    req_json = request.json
    tool_name = req_json['name']
    rate_option = req_json['rateOption']
    user = req_json['userMail']
    results = database.create_rate_option(tool_name,rate_option)
    # response = results
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)