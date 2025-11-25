@@ .. @@
       <header className="bg-white shadow-sm border-b border-gray-200">
         <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
           <div className="flex items-center space-x-3">
-            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
+            <div className="w-10 h-10 bg-gradient-to-r from-african-brown to-african-orange rounded-xl flex items-center justify-center">
               <Star className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-xl font-bold text-gray-800">CamLingo</h1>
             {selectedLanguage && (
         )
         }
-              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
+              <span className="text-sm text-african-orange bg-orange-50 px-3 py-1 rounded-full font-medium">
                 Learning {selectedLanguage.nativeName}
               </span>
             )}
@@ .. @@
             <div className="flex items-center space-x-2 text-orange-500">
               <Flame className="w-5 h-5" />
               <span className="font-bold">{userProgress.streak}</span>
             </div>
-            <div className="flex items-center space-x-2 text-green-500">
+            <div className="flex items-center space-x-2 text-african-orange">
               <Trophy className="w-5 h-5" />
               <span className="font-bold">{userProgress.totalXP}</span>
             </div>