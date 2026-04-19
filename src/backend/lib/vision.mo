import Types "../types/vision";
import HCSTypes "../types/history-collections-sharing";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Text "mo:core/Text";
import List "mo:core/List";

module {
  /// Venice AI base URL for chat completions (OpenAI-compatible).
  public let VENICE_API_URL : Text = "https://api.venice.ai/api/v1/chat/completions";

  /// Venice AI API key.
  public let VENICE_API_KEY : Text = "VENICE_ADMIN_KEY_kQREam1ZEO4Xc8qhUfa5aweuKcedSfz6cf57N4wkrC";

  /// Vision model to use.
  public let VENICE_MODEL : Text = "qwen3-vl-235b-a22b";

  /// Return the system prompt for the given analysis mode.
  public func systemPromptForMode(mode : HCSTypes.AnalysisMode) : Text {
    switch (mode) {
      case (#generic) {
        "Analyze this image in detail. Provide your response in the following exact format:\n\nSCENE_DESCRIPTION: [A comprehensive description of the scene]\n\nDETECTED_OBJECTS: [List each detected object on its own line as: name:confidence where confidence is a number between 0 and 1, e.g. cat:0.95]\n\nEXTRACTED_TEXT: [Any text visible in the image, or NONE if no text is present]\n\nAfter your analysis, use web search to find relevant information about the main subjects in this image.";
      };
      case (#plant) {
        "You are a plant identification expert. Identify the plant species, provide care tips, sun/water requirements, and any toxicity warnings for humans or pets. Then search the web for more info.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Plant species identification and overall description]\n\nDETECTED_OBJECTS: [List each plant/item as: name:confidence where confidence is 0-1, e.g. monstera:0.92]\n\nEXTRACTED_TEXT: [Any text visible in the image, or NONE if no text is present]";
      };
      case (#food) {
        "You are a food and nutrition expert. Identify the food items shown, estimate nutritional content (calories, macros), and suggest recipes using these ingredients. Search the web for detailed recipes.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Food identification, nutritional estimates, and recipe suggestions]\n\nDETECTED_OBJECTS: [List each food item as: name:confidence where confidence is 0-1, e.g. avocado:0.97]\n\nEXTRACTED_TEXT: [Any text visible in the image, or NONE if no text is present]";
      };
      case (#bookProduct) {
        "You are a product research assistant. Identify any books, products, or items shown. Provide title/name, reviews summary, estimated price range, and where to buy. Search the web for current listings.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Product/book identification with reviews summary, price range, and purchase options]\n\nDETECTED_OBJECTS: [List each identified product/book as: name:confidence where confidence is 0-1, e.g. harry-potter:0.99]\n\nEXTRACTED_TEXT: [Any text visible in the image such as titles, ISBNs, barcodes, or NONE if no text is present]";
      };
      case (#translation) {
        "You are a translation expert. Extract all text visible in the image. Identify the language(s) and provide a full translation to English. Include context about any cultural references.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Language identification, full translation, and cultural context]\n\nDETECTED_OBJECTS: [List any notable objects as: name:confidence where confidence is 0-1]\n\nEXTRACTED_TEXT: [All text extracted verbatim from the image, or NONE if no text is present]";
      };
      case (#artLandmark) {
        "You are an art historian and travel expert. Identify any artworks, monuments, landmarks, or buildings shown. Provide historical context, artist/architect, date, and cultural significance. Search for more info.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Artwork/landmark identification with historical context, artist/architect, date, and cultural significance]\n\nDETECTED_OBJECTS: [List each identified artwork/landmark as: name:confidence where confidence is 0-1, e.g. eiffel-tower:0.99]\n\nEXTRACTED_TEXT: [Any text or inscriptions visible in the image, or NONE if no text is present]";
      };
      case (#receipt) {
        "You are a document parser. Extract all itemized data from this receipt or document: merchant name, date, all line items with amounts, subtotal, tax, and total. Format as a structured list.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Merchant name, date, itemized list with amounts, subtotal, tax, and total]\n\nDETECTED_OBJECTS: [List document type as: name:confidence, e.g. receipt:0.99]\n\nEXTRACTED_TEXT: [All text extracted verbatim from the receipt/document, or NONE if no text is present]";
      };
      case (#medicalReference) {
        "You are a medical reference tool (NOT a diagnostic tool). For informational purposes only: describe what is visible in the image (skin condition, anatomy, etc.) and provide general medical reference information. Always include a disclaimer that this is not medical advice.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Visual description and general medical reference information — DISCLAIMER: This is not medical advice. Consult a qualified healthcare professional.]\n\nDETECTED_OBJECTS: [List any identifiable anatomical features or conditions as: name:confidence where confidence is 0-1]\n\nEXTRACTED_TEXT: [Any text visible in the image, or NONE if no text is present]";
      };
      case (#carFashion) {
        "You are a car and fashion identification expert. Identify the make/model/year of vehicles shown, or brand/style of clothing/accessories. Search the web for prices, reviews, and where to find them.\n\nProvide your response in the following exact format:\n\nSCENE_DESCRIPTION: [Vehicle or fashion item identification with make/model/year or brand/style, price range, and where to find them]\n\nDETECTED_OBJECTS: [List each identified vehicle or fashion item as: name:confidence where confidence is 0-1, e.g. tesla-model-3:0.95]\n\nEXTRACTED_TEXT: [Any text visible in the image such as badges or tags, or NONE if no text is present]";
      };
    };
  };

  /// Escape a text value for embedding inside a JSON string.
  func jsonEscape(t : Text) : Text {
    t.flatMap(func(c : Char) : Text {
      if (c == '\"') "\\\"" else if (c == '\\') "\\\\" else if (c == '\n') "\\n" else if (c == '\r') "\\r" else if (c == '\t') "\\t" else c.toText()
    });
  };

  /// Build the JSON request body for Venice AI vision + web search.
  public func buildRequestBody(imageBase64 : Text, mimeType : Text, mode : ?HCSTypes.AnalysisMode) : Text {
    let resolvedMode : HCSTypes.AnalysisMode = switch (mode) {
      case (?m) m;
      case null #generic;
    };
    let prompt = systemPromptForMode(resolvedMode);
    let escapedPrompt = jsonEscape(prompt);
    "{\"model\":\"" # VENICE_MODEL # "\",\"messages\":[{\"role\":\"user\",\"content\":[{\"type\":\"text\",\"text\":\"" # escapedPrompt # "\"},{\"type\":\"image_url\",\"image_url\":{\"url\":\"data:" # mimeType # ";base64," # imageBase64 # "\"}}]}],\"enable_web_search\":true,\"max_tokens\":2048}";
  };

  /// Find the text that follows the first occurrence of needle in haystack.
  func textAfter(haystack : Text, needle : Text) : ?Text {
    let parts = haystack.split(#text needle);
    switch (parts.next()) {
      case null null;
      case (?_before) {
        // Collect the rest; if there is at least one more part, needle was found
        var rest = "";
        var found = false;
        var isFirst = true;
        for (part in parts) {
          if (isFirst) {
            rest := part;
            isFirst := false;
            found := true;
          } else {
            rest := rest # needle # part;
          };
        };
        if (found) ?rest else null;
      };
    };
  };

  /// Extract the first line after a prefix marker (e.g. "SCENE_DESCRIPTION: ").
  func extractSection(content : Text, prefix : Text) : ?Text {
    let searchFor = prefix # " ";
    switch (textAfter(content, searchFor)) {
      case null {
        switch (textAfter(content, prefix)) {
          case null null;
          case (?rest) {
            let line = switch (rest.split(#char '\n').next()) {
              case (?l) l;
              case null rest;
            };
            let trimmed = line.trim(#char ' ');
            if (trimmed.size() == 0) null else ?trimmed;
          };
        };
      };
      case (?rest) {
        let line = switch (rest.split(#char '\n').next()) {
          case (?l) l;
          case null rest;
        };
        let trimmed = line.trim(#char ' ');
        if (trimmed.size() == 0) null else ?trimmed;
      };
    };
  };

  /// Extract the model's reply content string from Venice AI JSON response.
  /// Searches for `"content":"` and decodes JSON escape sequences.
  func extractContent(rawJson : Text) : ?Text {
    let afterMarker : ?Text = switch (textAfter(rawJson, "\"content\":\"")) {
      case (?v) ?v;
      case null { textAfter(rawJson, "\"content\": \"") };
    };
    switch (afterMarker) {
      case null null;
      case (?rest) {
        var result = "";
        var escaped = false;
        var done = false;
        for (c in rest.chars()) {
          if (done) {}
          else if (escaped) {
            if (c == 'n') { result := result # "\n" }
            else if (c == 'r') { result := result # "\r" }
            else if (c == 't') { result := result # "\t" }
            else { result := result # c.toText() };
            escaped := false;
          } else if (c == '\\') {
            escaped := true;
          } else if (c == '\"') {
            done := true;
          } else {
            result := result # c.toText();
          };
        };
        ?result;
      };
    };
  };

  /// Convert a digit character to its numeric Float value.
  func digitToFloat(c : Char) : Float {
    let n = (c.toNat32() - '0'.toNat32()).toNat();
    n.toFloat();
  };

  /// Simple float parser for confidence values like "0.95".
  func parseFloat(s : Text) : Float {
    var intPart : Float = 0.0;
    var fracPart : Float = 0.0;
    var fracDiv : Float = 10.0;
    var inFrac = false;
    for (c in s.chars()) {
      if (c == '.') {
        inFrac := true;
      } else if (c.isDigit()) {
        let d = digitToFloat(c);
        if (inFrac) {
          fracPart := fracPart + d / fracDiv;
          fracDiv := fracDiv * 10.0;
        } else {
          intPart := intPart * 10.0 + d;
        };
      };
    };
    intPart + fracPart;
  };

  /// Parse detected objects from the DETECTED_OBJECTS section.
  /// Expects newline- or comma-separated entries in "name:confidence" format.
  func parseObjects(section : Text) : [Types.DetectedObject] {
    let accumulator = List.empty<Types.DetectedObject>();
    for (line in section.split(#char '\n')) {
      for (entry in line.split(#char ',')) {
        let e = entry.trim(#char ' ');
        if (e.size() > 0) {
          let chars = e.toArray();
          let len = chars.size();
          // Find last colon position
          var lastColon : Int = -1;
          var idx = 0;
          for (c in chars.vals()) {
            if (c == ':') lastColon := idx;
            idx += 1;
          };
          if (lastColon > 0) {
            let lc = lastColon; // Int, used with sliceToArray which takes Int
            if (lc + 1 < len) {
              let nameChars = chars.sliceToArray(0, lc);
              let confChars = chars.sliceToArray(lc + 1, len);
              let objName = Text.fromArray(nameChars).trim(#char ' ');
              let confText = Text.fromArray(confChars).trim(#char ' ');
              if (objName.size() > 0) {
                let conf = parseFloat(confText);
                accumulator.add({ name = objName; confidence = conf });
              };
            };
          };
        };
      };
    };
    accumulator.toArray();
  };

  /// Extract a JSON string field value (unescaped) from a JSON object fragment.
  /// Looks for `"fieldName":"` and reads until the closing unescaped `"`.
  func extractJsonString(json : Text, fieldName : Text) : ?Text {
    let marker1 = "\"" # fieldName # "\":\"";
    let marker2 = "\"" # fieldName # "\": \"";
    let afterMarker : ?Text = switch (textAfter(json, marker1)) {
      case (?v) ?v;
      case null { textAfter(json, marker2) };
    };
    switch (afterMarker) {
      case null null;
      case (?rest) {
        var result = "";
        var escaped = false;
        var done = false;
        for (c in rest.chars()) {
          if (done) {}
          else if (escaped) {
            if (c == 'n') { result := result # "\n" }
            else if (c == 'r') { result := result # "\r" }
            else if (c == 't') { result := result # "\t" }
            else { result := result # c.toText() };
            escaped := false;
          } else if (c == '\\') {
            escaped := true;
          } else if (c == '\"') {
            done := true;
          } else {
            result := result # c.toText();
          };
        };
        if (done) ?result else null;
      };
    };
  };

  /// Parse web_search_results from the top-level Venice AI JSON response.
  /// web_search_results is a JSON array of objects with title, url, snippet fields.
  func parseWebResults(rawJson : Text) : [Types.WebResult] {
    // Find the web_search_results array
    let arrayStart : ?Text = switch (textAfter(rawJson, "\"web_search_results\":[")) {
      case (?v) ?v;
      case null { textAfter(rawJson, "\"web_search_results\": [") };
    };
    switch (arrayStart) {
      case null [];
      case (?rest) {
        let accumulator = List.empty<Types.WebResult>();
        // Split on object boundaries — each result object starts with `{`
        // We iterate character by character to extract individual `{...}` objects
        var depth = 0;
        var inString = false;
        var strEscaped = false;
        var objStart : Int = -1;
        var objChars = List.empty<Char>();
        var charIdx : Int = 0;
        for (c in rest.chars()) {
          if (strEscaped) {
            strEscaped := false;
            if (objStart >= 0) objChars.add(c);
          } else if (inString) {
            if (c == '\\') { strEscaped := true };
            if (c == '\"') { inString := false };
            if (objStart >= 0) objChars.add(c);
          } else {
            if (c == '\"') {
              inString := true;
              if (objStart >= 0) objChars.add(c);
            } else if (c == '{') {
              depth += 1;
              if (depth == 1) {
                objStart := charIdx;
                objChars := List.empty<Char>();
              };
              if (objStart >= 0) objChars.add(c);
            } else if (c == '}') {
              if (objStart >= 0) objChars.add(c);
              if (depth == 1 and objStart >= 0) {
                // We have a complete object
                let objText = Text.fromArray(objChars.toArray());
                let title = switch (extractJsonString(objText, "title")) { case (?v) v; case null "" };
                let url = switch (extractJsonString(objText, "url")) { case (?v) v; case null "" };
                let snippet = switch (extractJsonString(objText, "snippet")) { case (?v) v; case null "" };
                if (url.size() > 0) {
                  accumulator.add({ title; url; snippet });
                };
                objStart := -1;
              };
              depth -= 1;
              // Stop after the closing `]`
            } else if (c == ']' and depth == 0) {
              charIdx += 1; // will exit loop naturally
            } else {
              if (objStart >= 0) objChars.add(c);
            };
          };
          charIdx += 1;
        };
        accumulator.toArray();
      };
    };
  };

  /// Parse the raw JSON response from Venice AI into an AnalysisResult.
  /// Returns #err with a message if the response cannot be parsed.
  public func parseResponse(rawJson : Text) : Types.AnalysisResponse {
    if (rawJson.size() == 0) {
      return #err("Empty response from Venice AI");
    };
    switch (extractContent(rawJson)) {
      case null {
        #err("Failed to extract content from Venice AI response: " # rawJson);
      };
      case (?content) {
        let sceneDesc = switch (extractSection(content, "SCENE_DESCRIPTION:")) {
          case (?v) v;
          case null content;
        };
        let objectsSection = switch (extractSection(content, "DETECTED_OBJECTS:")) {
          case (?v) v;
          case null "";
        };
        let extractedText = switch (extractSection(content, "EXTRACTED_TEXT:")) {
          case (?v) if (v == "NONE") "" else v;
          case null "";
        };
        let objects = if (objectsSection.size() > 0) parseObjects(objectsSection) else [];
        // Extract web_search_results from the top-level JSON response (not from model content)
        let webResults = parseWebResults(rawJson);
        #ok({
          objects = objects;
          extractedText = extractedText;
          sceneDescription = sceneDesc;
          webResults = webResults;
        });
      };
    };
  };

  /// Call Venice AI with the given base64 image and return parsed results.
  /// mode: optional analysis mode — defaults to #generic if null.
  public func analyzeImage(
    imageBase64 : Text,
    mimeType : Text,
    mode : ?HCSTypes.AnalysisMode,
    transform : OutCall.Transform,
  ) : async Types.AnalysisResponse {
    let body = buildRequestBody(imageBase64, mimeType, mode);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer " # VENICE_API_KEY },
    ];
    try {
      let rawJson = await OutCall.httpPostRequest(VENICE_API_URL, headers, body, transform);
      parseResponse(rawJson);
    } catch (e) {
      #err("HTTP outcall failed: " # e.message());
    };
  };
};
