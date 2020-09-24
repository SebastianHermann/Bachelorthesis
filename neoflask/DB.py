from neo4j import GraphDatabase


class DB:
    URI = "bolt://127.0.0.1:7687"
    user = ""
    password = ""
    DRIVER = GraphDatabase.driver(URI, auth=(user, password))

    
###############  CREATE   ####################

    def create_toola(self, user_mail, tool_name, description, developer, website, hor_scal, multi_struc, low_lat_pro, r_time_pro, features, categories):
        #Check if tool_name is available
        with self.DRIVER.session() as session:
            node = session.run("Match (tool:Tool) Where tool.name=$name return (tool)", name=tool_name)
            
            if len(node.data())==0: #if the name is available...
                #create Tool
                session.run("Create (tool:Tool {name: $name, description: $description, developer: $developer, website: $website, horizontalScalability: $hor_scal, multiStructuredData: $multi_struc, lowLatencyProcessing: $low_lat_pro, realTimeProcessing: $r_time_pro})",name=tool_name, description=description, developer=developer, website=website, hor_scal=hor_scal, multi_struc=multi_struc, low_lat_pro=low_lat_pro, r_time_pro=r_time_pro)

                #create relationship between tool and user
                session.run('''MATCH (tool:Tool),(user:User) WHERE tool.name = $name AND user.mail = $user_mail
                CREATE (tool)-[r:CREATED_BY { name: tool.name + '<->' + user.mail }]->(user)
                RETURN type(r), r.name''',name=tool_name, user_mail=user_mail)

                #iteratre through categories...
                for category in categories:
                    #check if category exists
                    node = session.run("MATCH (category:Category) Where category.name=$category return (category)", category=category)
                    #if not: create category
                    if len(node.data())==0:
                        session.run("CREATE (category:Category {name: $name})",name=category)
                    #link to tool
                    session.run('''MATCH (tool:Tool),(category:Category) WHERE tool.name = $name AND category.name = $category 
                    CREATE (tool)-[r:IS_A { name: tool.name + '<->' + category.name }]->(category) RETURN type(r), r.name''',name=tool_name, category=category)

                #iteratre through features...
                for feature in features:
                    #check if feature exists
                    node = session.run("MATCH (feature:Feature) Where feature.name=$feature return (feature)", feature=feature)
                    #if not: create feature
                    if len(node.data())==0:
                        session.run("CREATE (feature:Feature {name: $name})",name=feature)
                    #link to tool
                    session.run('''MATCH (tool:Tool),(feature:Feature) WHERE tool.name = $name AND feature.name = $feature 
                    CREATE (tool)-[r:PROVIDES { name: tool.name + '<->' + feature.name }]->(feature) RETURN type(r), r.name''',name=tool_name, feature=feature)
                return {"Status": "Ok"}
            else:
                return {"Status": "Tool does allready exist"}
            self.DRIVER.close()
        
###############  EDIT  ####################
    
    def edit_toola(self, user_mail, old_tool_name, tool_name, description, developer, website, hor_scal, multi_struc, low_lat_pro, r_time_pro, features, categories):
        with self.DRIVER.session() as session:
            print(session)
            #Replace the old tool with the new tool. Incase the name of the old_tool has changed too, the old_name is provided additionally since the tool identifies itself by its name
            session.run('''MATCH (tool:Tool { name: $old_name })
            SET tool = {name: $name, description: $description, developer: $developer, website: $website, horizontalScalability: $hor_scal, 
            multiStructuredData: $multi_struc, lowLatencyProcessing: $low_lat_pro, realTimeProcessing: $r_time_pro}''',old_name=old_tool_name, name=tool_name, description=description, developer=developer, website=website, hor_scal=hor_scal, multi_struc=multi_struc, low_lat_pro=low_lat_pro, r_time_pro=r_time_pro)

            #Next Step is to replace the old categories with the new ones. Therefore, erased categories have to be deleted and newly added categories have to be created

            #First get the old categories
            node = session.run("Match (tool:Tool)-[]->(category:Category) where tool.name=$tool_name return (category)",tool_name=tool_name)
            old_categories=[]
            for item in node.data():
                old_categories.append(item.get('category').get('name'))
            
            #Now compare the old ones with the new ones.
            #Prepare the old categories to be deleted
            cat_to_delete = [category for category in old_categories if category not in categories]

            #Prepare the new categories to be created
            cat_to_create = [category for category in categories if category not in old_categories]

            #delete old categories of tool
            for category in cat_to_delete:
                session.run("Match (tool:Tool {name: $tool_name})-[r]->(category:Category {name: $category}) DELETE r", tool_name=tool_name, category = category)

            #iteratre through categories...
            for category in cat_to_create:
                #check if category exists
                node = session.run("MATCH (category:Category) Where category.name=$category return (category)", category=category)
                #if not: create category
                if len(node.data())==0:
                    session.run("CREATE (category:Category {name: $name})",name=category)
                #link to tool
                session.run('''MATCH (tool:Tool),(category:Category) WHERE tool.name = $name AND category.name = $category 
                CREATE (tool)-[r:IS_A { name: tool.name + '<->' + category.name }]->(category) RETURN type(r), r.name''',name=tool_name, category=category)

            #First get the old features
            node = session.run("Match (tool:Tool)-[]->(feature:Feature) where tool.name=$tool_name return (feature)",tool_name=tool_name)
            old_features=[]
            for item in node.data():
                old_features.append(item.get('feature').get('name'))
            
            #Now compare the old ones with the new ones.
            #Prepare the old features to be deleted
            feat_to_delete = [feature for feature in old_features if feature not in features]

            #Prepare the new features to be created
            feat_to_create = [feature for feature in features if feature not in old_features]

            #delete old features of tool
            for feature in feat_to_delete:
                session.run("Match (tool:Tool {name: $tool_name})-[r]->(feature:Feature {name: $feature}) DELETE r", tool_name=tool_name, feature = feature)

            #iteratre through features...
            for feature in feat_to_create:
                #check if feature exists
                node = session.run("MATCH (feature:Feature) Where feature.name=$feature return (feature)", feature=feature)
                #if not: create feature
                if len(node.data())==0:
                    session.run("CREATE (feature:Feature {name: $name})",name=feature)
                #link to tool
                session.run('''MATCH (tool:Tool),(feature:Feature) WHERE tool.name = $name AND feature.name = $feature 
                CREATE (tool)-[r:PROVIDES { name: tool.name + '<->' + feature.name }]->(feature) RETURN type(r), r.name''',name=tool_name, feature=feature)

            print(features)
            print(old_features)    
            print("Delete features ",feat_to_delete)
            print("Create features",feat_to_create)
            print("Delete category ",cat_to_delete)
            print("Create category",cat_to_create)
            
        self.DRIVER.close()         


###### Search #########

    def search_tool(self, search_string):
        with self.DRIVER.session() as session:
            node = session.run("Match (n)<-[]-(tool:Tool) where LOWER(n.name) contains LOWER($search_string) OR LOWER(tool.name) contains LOWER($search_string) return DISTINCT tool",search_string=search_string)
            # print(list(node.data()))
            results = []
            for item in node.data():
                tool = self.get_information_of_tool(item["tool"]["name"])
                # tool["description"] = item["tool"]["description"]j
                
                # tool["developer"] = item["tool"]["developer"]
                # tool["website"] = item["tool"]["website"]
                # tool["categories"] = self.get_categories_of_tool(item["tool"]["name"])
                # tool["features"] = self.get_features_of_tool(item["tool"]["name"])
                results.append(tool)
                
            return results
        # self.DRIVER.close()

        
###### Rating Functionality ######

    # Create Rating Option 
    def create_rate_option(self, tool_name1, tool_name2):
        with self.DRIVER.session() as session:
            node = session.run('''
            Match (tool:Tool {name: $tool_name1}),(tool2:Tool {name: $tool_name2})
            Create (tool)<-[:RATE_OPTION]-(rating:Rating {rateType: "Compatibility"})-[:RATE_OPTION]->(tool2)
            ''', tool_name1=tool_name1,tool_name2=tool_name2)
            
            return {"Status": "Ok"}
        self.DRIVER.close()

 # Load Rating Options of a Tool
    def load_rate_options(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run('''
            Match (tool:Tool {name: $tool_name})<-[:RATE_OPTION]-(rating:Rating {rateType: "Compatibility"})-[:RATE_OPTION]->(tool2:Tool) return tool2 as tool
            ''', tool_name=tool_name)
            results = []
            for item in node.data():
                print(item)
                # item[return attribute][property]
                tool = self.get_information_of_tool(item["tool"]["name"])
                results.append(tool)

            return results
        self.DRIVER.close()
    
 # Get Rate of tools
    def get_rates(self, tool_name_1, tool_name_2, user):
        with self.DRIVER.session() as session:
            node = session.run('''
            Match (tool:Tool {name: $tool_name})<-[:RATE_OPTION]-(rating:Rating {rateType: "Compatibility"})-[:RATE_OPTION]->(tool2:Tool) return tool2 as tool
            ''', tool_name=tool_name)
            results = []
            for item in node.data():
                print(item)
                # item[return attribute][property]
                tool = self.get_information_of_tool(item["tool"]["name"])
                results.append(tool)

            return results
        self.DRIVER.close()

###### get Information ########        

    # get all tools
    def get_all(self):
            with self.DRIVER.session() as session:
                node = session.run("Match (tool:Tool) return tool")
                all_tools = []
                for item in node.data():
                    tool = self.get_information_of_tool(item["tool"]["name"])
                    all_tools.append(tool)
                return all_tools

            self.DRIVER.close()


    # get all information of a tool
    def get_information_of_tool(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run("MATCH (tool:Tool { name: $tool_name }) return tool", tool_name=tool_name)
            item = node.data()[0]
            tool= {}
            tool["name"] = item["tool"]["name"]
            tool["description"] = item["tool"]["description"]
            tool["developer"] = item["tool"]["developer"]
            tool["website"] = item["tool"]["website"]
            tool["horizontalScalability"] = item["tool"]["horizontalScalability"]
            tool["lowLatencyProcessing"] = item["tool"]["lowLatencyProcessing"]
            tool["multiStructuredData"] = item["tool"]["multiStructuredData"]
            tool["realTimeProcessing"] = item["tool"]["realTimeProcessing"]

            tool["admins"] = self.get_creator_of_tool(item["tool"]["name"])
            tool["categories"] = self.get_categories_of_tool(item["tool"]["name"])
            tool["features"] = self.get_features_of_tool(item["tool"]["name"])

                #get rating possibilites
                #get user rate of every rating possibility

                # results.append(tool)
            return tool
        self.DRIVER.close()


    # get categories of tool
    def get_categories_of_tool(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run("Match (category:Category)<-[]-(tool:Tool) where tool.name = $tool_name return category", tool_name=tool_name)
            categories=[]
            for item in node.data():
                categories.append(item.get('category').get('name'))
            return categories
        self.DRIVER.close()


    # get features of tool
    def get_features_of_tool(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run("Match (feature:Feature)<-[]-(tool:Tool) where tool.name = $tool_name return feature", tool_name=tool_name)   
            features=[]
            for item in node.data():
                features.append(item.get('feature').get('name'))
            return features
        self.DRIVER.close()

    # get creator of tool
    def get_creator_of_tool(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run("Match (admins:User)<-[:CREATED_BY]-(tool:Tool) where tool.name = $tool_name return admins", tool_name=tool_name)
            categories=[]
            for item in node.data():
                categories.append(item.get('admins').get('mail'))
            return categories
        self.DRIVER.close()
        
######### Delete a tool and detach relationships to categories, features and other tools #########

    # delete a tool
    def delete_tool(self, tool_name):
        with self.DRIVER.session() as session:
            #First, delete the tool-related rating nodes and any relationship going to or from it, use DETACH DELETE
            node = session.run("MATCH (tool:Tool { name: $tool_name })-[]-(rating:Rating) DETACH DELETE rating", tool_name=tool_name)
            #Then, delete the tool and any relationship going to or from it, by againg using DETACH DELETE
            node = session.run("MATCH (tool:Tool { name: $tool_name }) DETACH DELETE tool", tool_name=tool_name)   
            return {"Status": "Ok"}
        self.DRIVER.close()

    
########## Check Permission ###########
    
    # Check if user is admin of tool
    def check_admin(self,tool_name, user):
        with self.DRIVER.session() as session:
            node = session.run("MATCH (tool:Tool { name: $tool_name })-[:CREATED_BY]->(admin: User) return admin.mail=$user as isAdmin", tool_name=tool_name, user=user)   
            return node.single()["isAdmin"]
            # features=[]
            # for item in node.data():
            #     features.append(item.get('feature').get('name'))
            # return features
        self.DRIVER.close()

    #Create a user
    def create_user(self, user_mail):
        with self.DRIVER.session() as session:
            node = session.run("Match (user:User) Where user.mail=$mail return (user)", mail=user_mail)
            if len(node.data())==0:
                session.run("Create (user:User {mail: $mail})", mail=user_mail)   
        self.DRIVER.close()

    
    ###############  READ   ####################
    #######  Show Tools   #######
    

    def get_tool_info(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run("Match (tool:Tool)-[]->(r) where tool.name=$tool_name return r.name as name, labels(r)[0] as label",tool_name=tool_name)
            tool_info = node.data()
            ordered_tool_info = {}
            for item in tool_info:
                if(item['label'] in ordered_tool_info):
                    ordered_tool_info[item['label']].append(item.get("name"))
                else:
                    ordered_tool_info[item.get('label')] = [item.get("name")]
            return ordered_tool_info
        self.DRIVER.close()

    #######  Autocomplete   #######

    # get a tool by its name
    def get_tool_by_name(self, tool_name):
        with self.DRIVER.session() as session:
            node = session.run("Match (tool:Tool) Where tool.name=$tool_name return (tool)", tool_name=tool_name)
            return node.data()[0].get("tool")
        self.DRIVER.close()

    
    # get all categories
    def get_categories(self):
        with self.DRIVER.session() as session:
            node = session.run("Match (category:Category) return (category)")
            categories=[]
            for item in node.data():
                categories.append(item.get('category').get('name'))
            
            return categories
        self.DRIVER.close()

    # get all features
    def get_features(self):
        with self.DRIVER.session() as session:
            node = session.run("Match (feature:Feature) return (feature)")
            features=[]
            for item in node.data():
                features.append(item.get('feature').get('name'))
            
            return features
        self.DRIVER.close()


    ###################################

    