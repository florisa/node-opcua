"use strict";
const should = require("should");
const constructEventFilter = require("..").constructEventFilter;

const AttributeIds = require("node-opcua-data-model").AttributeIds;
const coerceNodeId = require("node-opcua-nodeid").coerceNodeId;

describe("test constructEventFilter", function () {

    it("should construct a simple event filter with a single string (with namespace)", function () {

        const ef = constructEventFilter("2:SourceName");

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(1);
        ef.selectClauses[0].browsePath[0].name.should.eql("SourceName");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(2);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });

    it("should construct a simple event filter", function () {

        const ef = constructEventFilter(["SourceName"]);

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(1);
        ef.selectClauses[0].browsePath[0].name.should.eql("SourceName");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(0);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });

    it("should construct a simple event filter with two clauses", function () {

        const ef = constructEventFilter(["SourceName", "Time"]);

        ef.selectClauses.length.should.eql(2);

        ef.selectClauses[0].browsePath.length.should.eql(1);
        ef.selectClauses[0].browsePath[0].name.should.eql("SourceName");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(0);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

        ef.selectClauses[1].browsePath.length.should.eql(1);
        ef.selectClauses[1].browsePath[0].name.should.eql("Time");
        ef.selectClauses[1].browsePath[0].namespaceIndex.should.eql(0);

        ef.selectClauses[1].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[1].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });

    it("should construct a simple event filter with namespace", function () {

        const ef = constructEventFilter(["2:SourceName"]);

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(1);
        ef.selectClauses[0].browsePath[0].name.should.eql("SourceName");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(2);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });

    it("should construct a simple event filter with a qualified name", function () {

        const ef = constructEventFilter([{namespaceIndex: 2, name: "SourceName"}]);

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(1);
        ef.selectClauses[0].browsePath[0].name.should.eql("SourceName");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(2);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });
    it("should construct a simple event filter with a qualified name", function () {

        const ef = constructEventFilter({namespaceIndex: 2, name: "SourceName"});

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(1);
        ef.selectClauses[0].browsePath[0].name.should.eql("SourceName");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(2);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });

    it("should construct a event filter with a 2 level browse path (form 1)", function () {

        const ef = constructEventFilter("2:Component1.3:Property1");

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(2);

        ef.selectClauses[0].browsePath[0].name.should.eql("Component1");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(2);

        ef.selectClauses[0].browsePath[1].name.should.eql("Property1");
        ef.selectClauses[0].browsePath[1].namespaceIndex.should.eql(3);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });
    it("should construct a event filter with a 2 level browse path (form 2)", function () {

        const ef = constructEventFilter([["2:Component1", "3:Property1"]]);

        //xx console.log(ef.toString());

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(2);

        ef.selectClauses[0].browsePath[0].name.should.eql("Component1");
        ef.selectClauses[0].browsePath[0].namespaceIndex.should.eql(2);

        ef.selectClauses[0].browsePath[1].name.should.eql("Property1");
        ef.selectClauses[0].browsePath[1].namespaceIndex.should.eql(3);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.Value);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=2041");

    });

    it("should construct a event filter with ConditionType", function () {

        const ef = constructEventFilter([],[coerceNodeId("i=9999")]);

        ef.selectClauses.length.should.eql(1);
        ef.selectClauses[0].browsePath.length.should.eql(0);

        ef.selectClauses[0].attributeId.should.eql(AttributeIds.NodeId);
        ef.selectClauses[0].typeDefinitionId.toString().should.eql("ns=0;i=9999");

    });
});

