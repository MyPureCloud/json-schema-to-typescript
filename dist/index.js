(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsonSchemaToTypescript = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lodash_1 = require('lodash');
var TsType;
(function (TsType_1) {
    TsType_1.DEFAULT_SETTINGS = {
        declarationDescription: true,
        declareReferenced: true,
        declareSimpleType: false,
        endPropertyWithSemicolon: true,
        endTypeWithSemicolon: true,
        propertyDescription: true,
        useFullReferencePathAsName: false,
        // declareProperties: false,
        useInterfaceDeclaration: true,
        useTypescriptEnums: false,
        exportInterfaces: false,
    };
    var TsType = (function () {
        function TsType() {
        }
        TsType.prototype.safeId = function () {
            return this.id && lodash_1.upperFirst(lodash_1.camelCase(this.id));
        };
        TsType.prototype.toBlockComment = function (settings) {
            return this.description && settings.declarationDescription ? "/** " + this.description + " */\n" : '';
        };
        TsType.prototype._toDeclaration = function (decl, settings) {
            return this.toBlockComment(settings) + decl + (settings.endTypeWithSemicolon ? ';' : '');
        };
        TsType.prototype.isSimpleType = function () { return true; };
        TsType.prototype.toDeclaration = function (settings) {
            return this._toDeclaration("type " + this.safeId() + " = " + this._type(settings), settings);
        };
        TsType.prototype.toSafeType = function (settings) {
            return this.toType(settings);
        };
        TsType.prototype.toType = function (settings) {
            return this.safeId() || this._type(settings);
        };
        TsType.prototype.toString = function () {
            return this._type(TsType_1.DEFAULT_SETTINGS);
        };
        return TsType;
    }());
    TsType_1.TsType = TsType;
    var Any = (function (_super) {
        __extends(Any, _super);
        function Any() {
            _super.apply(this, arguments);
        }
        Any.prototype._type = function () {
            return 'any';
        };
        return Any;
    }(TsType));
    TsType_1.Any = Any;
    var String = (function (_super) {
        __extends(String, _super);
        function String() {
            _super.apply(this, arguments);
        }
        String.prototype._type = function () {
            return 'string';
        };
        return String;
    }(TsType));
    TsType_1.String = String;
    var Boolean = (function (_super) {
        __extends(Boolean, _super);
        function Boolean() {
            _super.apply(this, arguments);
        }
        Boolean.prototype._type = function () {
            return 'boolean';
        };
        return Boolean;
    }(TsType));
    TsType_1.Boolean = Boolean;
    var Number = (function (_super) {
        __extends(Number, _super);
        function Number() {
            _super.apply(this, arguments);
        }
        Number.prototype._type = function () {
            return 'number';
        };
        return Number;
    }(TsType));
    TsType_1.Number = Number;
    var Object = (function (_super) {
        __extends(Object, _super);
        function Object() {
            _super.apply(this, arguments);
        }
        Object.prototype._type = function () {
            return 'Object';
        };
        return Object;
    }(TsType));
    TsType_1.Object = Object;
    var Void = (function (_super) {
        __extends(Void, _super);
        function Void() {
            _super.apply(this, arguments);
        }
        Void.prototype._type = function () {
            return 'void';
        };
        return Void;
    }(TsType));
    TsType_1.Void = Void;
    var Literal = (function (_super) {
        __extends(Literal, _super);
        function Literal(value) {
            _super.call(this);
            this.value = value;
        }
        Literal.prototype._type = function () {
            return this.value;
        };
        return Literal;
    }(TsType));
    TsType_1.Literal = Literal;
    var EnumValue = (function () {
        function EnumValue(enumValues) {
            var hasValue = !!enumValues[0];
            // quirky propagation logic
            if (hasValue) {
                this.identifier = enumValues[0];
                this.value = enumValues[1];
            }
            else {
                this.identifier = enumValues[1];
            }
        }
        EnumValue.prototype.toDeclaration = function () {
            // if there is a value associated with the identifier, declare as identifier=value
            // else declare as identifier
            return "" + this.identifier + (this.value ? ('=' + this.value) : '');
        };
        EnumValue.prototype.toString = function () {
            return "Enum" + this.identifier;
        };
        return EnumValue;
    }());
    TsType_1.EnumValue = EnumValue;
    var Enum = (function (_super) {
        __extends(Enum, _super);
        function Enum(enumValues) {
            _super.call(this);
            this.enumValues = enumValues;
        }
        Enum.prototype.isSimpleType = function () { return false; };
        Enum.prototype._type = function (settings) {
            return this.safeId() || "SomeEnumType";
        };
        Enum.prototype.toSafeType = function (settings) {
            return "" + this.toType(settings);
        };
        Enum.prototype.toDeclaration = function (settings) {
            return "" + this.toBlockComment(settings) + (settings.exportInterfaces ? "export " : "") + "enum " + this._type(settings) + "{\n      " + this.enumValues.map(function (_) { return _.toDeclaration(); }).join(',\n') + "\n    }";
        };
        return Enum;
    }(TsType));
    TsType_1.Enum = Enum;
    var Array = (function (_super) {
        __extends(Array, _super);
        function Array(type) {
            _super.call(this);
            this.type = type;
        }
        Array.prototype._type = function (settings) {
            return (this.type || new Any()).toSafeType(settings) + "[]";
        };
        return Array;
    }(TsType));
    TsType_1.Array = Array;
    var Intersection = (function (_super) {
        __extends(Intersection, _super);
        function Intersection(data) {
            _super.call(this);
            this.data = data;
        }
        Intersection.prototype.isSimpleType = function () { return this.data.filter(function (_) { return !(_ instanceof Void); }).length <= 1; };
        Intersection.prototype._type = function (settings) {
            return this.data
                .filter(function (_) { return !(_ instanceof Void); })
                .map(function (_) { return _.toSafeType(settings); })
                .join('&');
        };
        Intersection.prototype.toSafeType = function (settings) {
            return "" + this.toType(settings);
        };
        return Intersection;
    }(TsType));
    TsType_1.Intersection = Intersection;
    var Union = (function (_super) {
        __extends(Union, _super);
        function Union() {
            _super.apply(this, arguments);
        }
        Union.prototype.isSimpleType = function () { return this.data.length <= 1; };
        Union.prototype._type = function (settings) {
            return this.data
                .map(function (_) { return _.toSafeType(settings); })
                .join('|');
        };
        return Union;
    }(Intersection));
    TsType_1.Union = Union;
    var Interface = (function (_super) {
        __extends(Interface, _super);
        function Interface(props) {
            _super.call(this);
            this.props = props;
        }
        Interface.reference = function (id) {
            var ret = new Interface([]);
            ret.id = id;
            return ret;
        };
        Interface.prototype._type = function (settings, declaration) {
            if (declaration === void 0) { declaration = false; }
            var id = this.safeId();
            return declaration || !id ? "{\n        " + this.props.map(function (_) {
                var decl = _.name;
                if (!_.required)
                    decl += '?';
                decl += ': ' + _.type.toType(settings);
                if (settings.endPropertyWithSemicolon)
                    decl += ';';
                if (settings.propertyDescription && _.type.description)
                    decl += ' // ' + _.type.description;
                return decl;
            }).join('\n') + "\n      }" : id;
        };
        Interface.prototype.isSimpleType = function () { return false; };
        Interface.prototype.toDeclaration = function (settings) {
            if (settings.useInterfaceDeclaration)
                return "" + this.toBlockComment(settings) + (settings.exportInterfaces ? "export " : "") + "interface " + this.safeId() + " " + this._type(settings, true);
            else
                return this._toDeclaration("type " + this.safeId() + " = " + this._type(settings, true), settings);
        };
        return Interface;
    }(TsType));
    TsType_1.Interface = Interface;
})(TsType = exports.TsType || (exports.TsType = {}));

},{"lodash":undefined}],2:[function(require,module,exports){
"use strict";
var pretty_printer_1 = require('./pretty-printer');
var TsTypes_1 = require('./TsTypes');
var fs_1 = require('fs');
var path_1 = require('path');
var lodash_1 = require('lodash');
var RuleType;
(function (RuleType) {
    RuleType[RuleType['Any'] = 0] = 'Any';
    RuleType[RuleType['TypedArray'] = 1] = 'TypedArray';
    RuleType[RuleType['Enum'] = 2] = 'Enum';
    RuleType[RuleType['AllOf'] = 3] = 'AllOf';
    RuleType[RuleType['AnyOf'] = 4] = 'AnyOf';
    RuleType[RuleType['Reference'] = 5] = 'Reference';
    RuleType[RuleType['NamedSchema'] = 6] = 'NamedSchema';
    RuleType[RuleType['AnonymousSchema'] = 7] = 'AnonymousSchema';
    RuleType[RuleType['String'] = 8] = 'String';
    RuleType[RuleType['Number'] = 9] = 'Number';
    RuleType[RuleType['Void'] = 10] = 'Void';
    RuleType[RuleType['Object'] = 11] = 'Object';
    RuleType[RuleType['Array'] = 12] = 'Array';
    RuleType[RuleType['Boolean'] = 13] = 'Boolean';
    RuleType[RuleType['Literal'] = 14] = 'Literal';
})(RuleType || (RuleType = {}));
var Compiler = (function () {
    function Compiler(schema, filePath, settings) {
        this.schema = schema;
        var path = path_1.resolve(filePath);
        this.filePath = path_1.parse(path);
        this.declarations = new Map;
        this.id = schema.id || schema.title || this.filePath.name || 'Interface1';
        this.settings = Object.assign({}, Compiler.DEFAULT_SETTINGS, settings);
        this.declareType(this.toTsType(this.schema, '', true), this.id, this.id);
    }
    Compiler.prototype.toString = function () {
        var _this = this;
        return pretty_printer_1.format(Array.from(this.declarations.values())
            .map(function (_) { return _.toDeclaration(_this.settings); })
            .join('\n'));
    };
    Compiler.prototype.isRequired = function (propertyName, schema) {
        return schema.required ? schema.required.indexOf(propertyName) > -1 : false;
    };
    Compiler.prototype.supportsAdditionalProperties = function (schema) {
        return schema.additionalProperties === true || lodash_1.isPlainObject(schema.additionalProperties);
    };
    Compiler.prototype.getRuleType = function (rule) {
        if (rule.type === 'array' && rule.items) {
            return RuleType.TypedArray;
        }
        // enum type vs enum constant?
        if (rule.enum) {
            return RuleType.Enum;
        }
        if (rule.properties || rule.additionalProperties) {
            return RuleType.NamedSchema;
        }
        if (rule.allOf) {
            return RuleType.AllOf;
        }
        if (rule.anyOf) {
            return RuleType.AnyOf;
        }
        if (rule.$ref) {
            return RuleType.Reference;
        }
        switch (rule.type) {
            case 'array': return RuleType.Array;
            case 'boolean': return RuleType.Boolean;
            case 'integer':
            case 'number': return RuleType.Number;
            case 'null': return RuleType.Void;
            case 'object': return RuleType.Object;
            case 'string': return RuleType.String;
        }
        if (this.isNumberLiteral(rule)) {
            return RuleType.Number;
        }
        if (!lodash_1.isPlainObject(rule)) {
            return RuleType.Literal;
        }
        if (lodash_1.isPlainObject(rule)) {
            return RuleType.AnonymousSchema; // TODO: is it safe to do this as a catchall?
        }
        return RuleType.Any;
    };
    Compiler.prototype.isNumberLiteral = function (a) {
        return /^[\d\.]+$/.test(a);
    };
    // eg. "#/definitions/diskDevice" => ["definitions", "diskDevice"]
    // only called in case of a $ref type
    Compiler.prototype.resolveType = function (refPath, propName) {
        if (refPath === '#' || refPath === '#/') {
            return TsTypes_1.TsType.Interface.reference(this.id);
        }
        if (refPath[0] !== '#') {
            var retVal = void 0;
            var id = void 0;
            var fullPath = path_1.resolve(path_1.join(this.filePath.dir, refPath));
            var file = fs_1.readFileSync(fullPath);
            var targetType = this.toTsType(JSON.parse(file.toString()), propName, false, true);
            if (targetType.id) {
                id = targetType.toSafeType(this.settings);
            }
            else {
                var parsedNewFile = path_1.parse(fullPath);
                id = parsedNewFile.name;
            }
            if (this.settings.declareReferenced) {
                this.declareType(targetType, id, id);
            }
            return new TsTypes_1.TsType.Literal(id);
        }
        ;
        var parts = refPath.slice(2).split('/');
        var ret = this.settings.declareReferenced ? this.declarations.get(parts.join('/')) : undefined;
        if (!ret) {
            var cur = this.schema;
            for (var i = 0; cur && i < parts.length; ++i) {
                cur = cur[parts[i]];
            }
            ret = this.toTsType(cur);
            if (this.settings.declareReferenced && (this.settings.declareSimpleType || !ret.isSimpleType()))
                this.declareType(ret, parts.join('/'), this.settings.useFullReferencePathAsName ? parts.join('/') : lodash_1.last(parts));
        }
        return ret;
    };
    Compiler.prototype.declareType = function (type, refPath, id) {
        type.id = id;
        this.declarations.set(refPath, type);
        return type;
    };
    Compiler.prototype.toStringLiteral = function (a) {
        var _this = this;
        switch (typeof a) {
            case 'boolean': return new TsTypes_1.TsType.Boolean; // ts doesn't support literal boolean types
            case 'number': return new TsTypes_1.TsType.Number; // ts doesn't support literal numeric types
            case 'string': return new TsTypes_1.TsType.Literal(JSON.stringify(a));
            default: return new TsTypes_1.TsType.Interface(lodash_1.map(a, function (v, k) {
                return {
                    name: k,
                    required: true,
                    type: _this.toStringLiteral(v)
                };
            }));
        }
    };
    Compiler.prototype.createTsType = function (rule, propName, isTop, isReference) {
        var _this = this;
        if (isTop === void 0) { isTop = false; }
        if (isReference === void 0) { isReference = false; }
        switch (this.getRuleType(rule)) {
            case RuleType.AnonymousSchema:
            case RuleType.NamedSchema:
                return this.toTsDeclaration(rule);
            case RuleType.Enum:
                // TODO:  honor the schema's "type" on the enum.  if string,
                // skip all the zipping mess; if int, either require the tsEnumNames 
                // or generate literals for the values
                // TODO:  what to do in the case where the value is an Object?  
                // right now we just pring [Object object] as the literal which is bad
                if (this.settings.useTypescriptEnums) {
                    var enumValues = lodash_1.zip(rule.tsEnumNames || [], rule.enum.map(function (_) { return new TsTypes_1.TsType.Literal(_).toType(_this.settings); }))
                        .map(function (_) { return new TsTypes_1.TsType.EnumValue(_); });
                    // TODO:  how do I get the property name under which this was declared
                    // (or the file name, failing that)? that would make a much better name here.
                    var path = rule.id || propName || ("Enum" + enumValues.map(function (_) { return _.identifier; }).join(""));
                    var retVal = new TsTypes_1.TsType.Enum(enumValues);
                    // don't add this to the declarations map if this is the top-level type (already declared)
                    // or if it's a reference and we don't want to declare those.
                    if (!isTop && (!isReference || this.settings.declareReferenced)) {
                        retVal = this.declareType(retVal, path, path);
                    }
                    return retVal;
                }
                else {
                    return new TsTypes_1.TsType.Union(lodash_1.uniqBy(rule.enum.map(function (_) { return _this.toStringLiteral(_); }), function (_) { return _.toType(_this.settings); }));
                }
            case RuleType.Any: return new TsTypes_1.TsType.Any;
            case RuleType.Literal: return new TsTypes_1.TsType.Literal(rule);
            case RuleType.TypedArray: return new TsTypes_1.TsType.Array(this.toTsType(rule.items));
            case RuleType.Array: return new TsTypes_1.TsType.Array;
            case RuleType.Boolean: return new TsTypes_1.TsType.Boolean;
            case RuleType.Number: return new TsTypes_1.TsType.Number;
            case RuleType.Object: return new TsTypes_1.TsType.Object;
            case RuleType.String: return new TsTypes_1.TsType.String;
            case RuleType.Void: return new TsTypes_1.TsType.Void;
            case RuleType.AllOf:
                return new TsTypes_1.TsType.Intersection(rule.allOf.map(function (_) { return _this.toTsType(_); }));
            case RuleType.AnyOf:
                return new TsTypes_1.TsType.Union(rule.anyOf.map(function (_) { return _this.toTsType(_); }));
            case RuleType.Reference:
                return this.resolveType(rule.$ref, propName);
        }
        throw new Error('Unknown rule:' + rule.toString());
    };
    Compiler.prototype.toTsType = function (rule, propName, isTop, isReference) {
        if (isTop === void 0) { isTop = false; }
        if (isReference === void 0) { isReference = false; }
        var type = this.createTsType(rule, propName, isTop, isReference);
        type.id = type.id || rule.id || rule.title;
        type.description = type.description || rule.description;
        return type;
    };
    Compiler.prototype.toTsDeclaration = function (schema) {
        var _this = this;
        var copy = lodash_1.merge({}, Compiler.DEFAULT_SCHEMA, schema);
        var props = lodash_1.map(copy.properties, function (v, k) {
            return {
                name: k,
                required: _this.isRequired(k, copy),
                type: _this.toTsType(v, k),
            };
        });
        if (props.length === 0 && !('additionalProperties' in schema)) {
            if ('default' in schema)
                return new TsTypes_1.TsType.Void;
        }
        if (this.supportsAdditionalProperties(copy)) {
            var short = copy.additionalProperties === true;
            if (short && props.length === 0)
                return new TsTypes_1.TsType.Any;
            var type = short ? new TsTypes_1.TsType.Any : this.toTsType(copy.additionalProperties);
            props.push({
                name: '[k: string]',
                required: true,
                type: type
            });
        }
        return new TsTypes_1.TsType.Interface(props);
    };
    Compiler.DEFAULT_SETTINGS = TsTypes_1.TsType.DEFAULT_SETTINGS;
    Compiler.DEFAULT_SCHEMA = {
        additionalProperties: true,
        properties: {},
        required: [],
        type: 'object'
    };
    return Compiler;
}());
function compile(schema, path, settings) {
    return new Compiler(schema, path, settings).toString();
}
exports.compile = compile;
function compileFromFile(inputFilename) {
    return new Promise(function (resolve, reject) {
        return fs_1.readFile(inputFilename, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(compile(JSON.parse(data.toString()), inputFilename));
            }
        });
    });
}
exports.compileFromFile = compileFromFile;

},{"./TsTypes":1,"./pretty-printer":3,"fs":undefined,"lodash":undefined,"path":undefined}],3:[function(require,module,exports){
// from https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#pretty-printer-using-the-ls-formatter
"use strict";
var ts = require('typescript');
function format(text) {
    var options = getDefaultOptions();
    // Parse the source text
    var sourceFile = ts.createSourceFile('file.ts', text, ts.ScriptTarget.Latest, /*setParentPointers*/ true);
    // Get the formatting edits on the input sources
    var edits = ts.formatting.formatDocument(sourceFile, getRuleProvider(options), options);
    // Apply the edits on the input code
    return applyEdits(text, edits);
    function getRuleProvider(options) {
        // Share this between multiple formatters using the same options.
        // This represents the bulk of the space the formatter uses.
        var ruleProvider = new ts.formatting.RulesProvider();
        ruleProvider.ensureUpToDate(options);
        return ruleProvider;
    }
    function applyEdits(text, edits) {
        // Apply edits in reverse on the existing text
        var result = text;
        for (var i = edits.length - 1; i >= 0; i--) {
            var change = edits[i];
            var head = result.slice(0, change.span.start);
            var tail = result.slice(change.span.start + change.span.length);
            result = head + change.newText + tail;
        }
        return result;
    }
    function getDefaultOptions() {
        return {
            ConvertTabsToSpaces: true,
            IndentSize: 2,
            IndentStyle: ts.IndentStyle.Smart,
            InsertSpaceAfterCommaDelimiter: true,
            InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            InsertSpaceAfterKeywordsInControlFlowStatements: true,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
            InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
            InsertSpaceAfterSemicolonInForStatements: true,
            InsertSpaceBeforeAndAfterBinaryOperators: true,
            NewLineCharacter: '\n',
            PlaceOpenBraceOnNewLineForControlBlocks: false,
            PlaceOpenBraceOnNewLineForFunctions: false,
            TabSize: 2
        };
    }
}
exports.format = format;

},{"typescript":undefined}]},{},[2])(2)
});