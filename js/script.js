

/*
https://github.com/Bowserinator/Periodic-Table-JSON/blob/master/PeriodicTableJSON.json#L184
https://en.wikipedia.org/wiki/Periodic_table
*/

import periodicTable from './elements';
import { strict } from 'assert';

/******************************************************************
// 1. Global variables
******************************************************************/
// for matter_categories
let gasMatterArray = [];
let solidMatterArray = [];
let liquidMatterArray = [];
let notNaturalMatterArray = [];

// for matter_types
let alkaliMetalArray = [];
let alkalineEarthMetalArray = [];
let lanthanideArray = [];
let actinideArray = [];
let transitionMetalArray = [];
let metalloidsArray = [];
let postTransitionMetalArray = [];
let reactiveNonmetalArray = [];
let nobleGasArray = [];
let unknownMatterArray = [];

let metalHeadlineMatterTypesBtn = document.querySelector(".metal_headline");
let nonMetalMatterTypesBtn = document.querySelector("nonmetal_headline");


function MatterTypesBtnProperties(colorBackground, colorHovered, noSelection, elementsClassName, elementsIdArray) {
    this.colorBackground = colorBackground;
    this.colorHovered = colorHovered;
    this.noSelection = noSelection;
    this.elementsClassName = elementsClassName;
    this.elementBtn = document.querySelector(elementsClassName);
    this.elementsIdArray = elementsIdArray;
};

const matterTypes = {
    alkaliMetal: new MatterTypesBtnProperties("rgb(197, 212, 255)", "pink", "green", ".alkali-metal", alkaliMetalArray),
    alkalineEarthMetal: new MatterTypesBtnProperties("rgb(255, 148, 148)", "pink", "green", ".alkaline-earth-metal", alkalineEarthMetalArray),
    lanthanide: new MatterTypesBtnProperties("#c3ffc7", "pink", "green", ".lanthanide", lanthanideArray),
    actinide: new MatterTypesBtnProperties("rgb(84, 181, 91)", "pink", "green", ".actinide", actinideArray),
    transitionMetal: new MatterTypesBtnProperties("rgb(255, 202, 164)", "pink", "green", ".transition-metal", transitionMetalArray),
    postTransitionMetal: new MatterTypesBtnProperties("#cddc39", "pink", "green", ".post-transition-metal", postTransitionMetalArray),
    metalloids: new MatterTypesBtnProperties("#c0a5f1", "pink", "green", ".metalloids", metalloidsArray),
    reactiveNonmetal: new MatterTypesBtnProperties("rgb(253, 255, 156)", "pink", "green", ".reactive-nonmetal", reactiveNonmetalArray),
    nobleGas: new MatterTypesBtnProperties("rgb(182, 238, 255)", "pink", "green", ".noble-gas", nobleGasArray),
    unknownMatter: new MatterTypesBtnProperties("#fef3ff", "pink", "green", ".unknown-properties", unknownMatterArray)
};

const matterTypesArray = Object.entries(matterTypes);


function matterCategoryBtnProperties(colorBackground, colorHovered, colorFont, noSelection, elementsClassName, elementsIdArray) {
    this.colorBackground = colorBackground;
    this.colorHovered = colorHovered;
    this.colorFont = colorFont;
    this.noSelection = noSelection;
    this.elementsClassName = elementsClassName;
    this.elementBtn = document.querySelector(elementsClassName);
    this.elementsIdArray = elementsIdArray;
};

const matterCategories = {
    gas: new matterCategoryBtnProperties("rgb(44, 41, 255)", "pink", "green", "violet", ".gas"),
    solid: new matterCategoryBtnProperties("#010101", "pink", "green", "violet", ".solid"),
    liquid: new matterCategoryBtnProperties("#288300", "pink", "green", "violet", ".liquid"),
    unknown: new matterCategoryBtnProperties("#868686", "pink", "green", "violet", ".unknown"),
}

const matterCategoriesArray = Object.entries(matterCategories);
console.log(matterCategoriesArray);


/******************************************************************
// 2. Make Row
******************************************************************/
rowGenerator();

/******************************************************************
// 3. Make Column
******************************************************************/
columnGenerator();

/******************************************************************
// 4. PeriodicTable_Boxes
******************************************************************/

let testSearchCategories = [];
console.log(testSearchCategories);

elementBoxesGenerator();

//add color to matter_types
elementBoxesColorConfiguration();

//add color to each element number based on their matter type (comes from states of matter)
mattterCategorizationConfigurator();


/******************************************************************
// 5. PeriodicTable_Presenter
// ******************************************************************/
periodicTablePresenterGenerator();

// matterTypesBtn.forEach(matterTypesBtnConfigurator => {
//     matterTypesBtnConfigurator.elementsIdArray.forEach(elementsQuerySelector => {
//         elementsQuerySelector.style.backgroundColor = matterTypesBtnConfigurator.colorBackground;
//     });
// });

/******************************************************************
// 5. Matter Types Buttons
******************************************************************/

matterTypesBtnConfiguration();

console.log(matterTypesArray);

function matterTypesBtnConfiguration() {
    matterTypesArray.forEach((configurator) => {

        configurator[1].elementBtn.style.backgroundColor = configurator[1].colorBackground;
        console.log("The matterTypesBtnConfigurator works!!!");

    });
};

/******************************************************************
// 6. Matter Categorization Buttons
******************************************************************/

matterCategoriesBtnConfiguration();

function matterCategoriesBtnConfiguration() {
    matterCategoriesArray.forEach((configurator) => {

        configurator[1].elementBtn.style.backgroundColor = configurator[1].colorBackground;
        console.log("The matterCategoriesBtnConfiguration!!!");

    });
};


/*_____________________________________________________________*/


function rowGenerator() {
    let rowGroupNumber = 0;
    let rowGroupYPos = 1;
    let rowGroupXPos = 1;

    for (let i = 0; i < 18; i++) {
            
        const domElementRow = document.createElement("div");

        // add number HTML
        let rowGroupNumberHTML = rowGroupNumber += 1;

        domElementRow.innerHTML = rowGroupNumberHTML;

        // add class
        domElementRow.classList.add("middle_pos");

        // add gridArea
        domElementRow.style.gridArea = rowGroupYPos + " / " + (rowGroupXPos += 1)/* + " / span 1 / span 1"*/;

        document.querySelector('.row_group').appendChild(domElementRow);
    };
};


function columnGenerator() {
    let columnPeriodNumber = 0;
    let columnPeriodYPos = 1;
    let columnPeriodXPos = 1;

    for (let i = 0; i < 7; i++) {
            
        const domElementColumn = document.createElement("div");

        // add number HTML
        let columnPeriodNumberHTML = columnPeriodNumber += 1;

        domElementColumn.innerHTML = columnPeriodNumberHTML;

        // add class
        domElementColumn.classList.add("middle_pos");

        // add gridArea
        domElementColumn.style.gridArea = (columnPeriodYPos += 1) + " / " + columnPeriodXPos/* + " / span 1 / span 1"*/;

        document.querySelector('.column_period').appendChild(domElementColumn);
    };
};


function elementBoxesGenerator() {

    // generate div
    periodicTable.elements.forEach((periodicEl) => {
        
        testSearchCategories.push(periodicEl.category);

        const domElement = document.createElement('div');

        // Add id="id"
        domElement.id = periodicEl.symbol.toLowerCase();

        // Add class="el_box" for layout
        domElement.classList.add("el_box");
        
        // Set position x / y
        periodicEl.ypos = periodicEl.ypos + 1;
        periodicEl.xpos = periodicEl.xpos + 1;

        domElement.style.gridArea = periodicEl.ypos.toString() + " / " +  periodicEl.xpos.toString() + " / span 1 / span 1";
    
        // Make divslocal
        document.querySelector('.container').append(domElement);

        // Add child-elements to each element
        const childDivsArray = ["number", "symbol", "name", "atomic_mass", "shells"];

        for (let i = 0; i < childDivsArray.length; i++) {
            const domElement = document.createElement('div');
            domElement.setAttribute("class", childDivsArray[i]);
            document.querySelector("#" + periodicEl.symbol.toLowerCase()).appendChild(domElement);
        }

        // DOMelements for child-elements
        let elNumber = domElement.querySelector(".number");
        let elSymbol = domElement.querySelector(".symbol"); 
        let elName = domElement.querySelector(".name"); 
        let elAtomicMass = domElement.querySelector(".atomic_mass"); 
        let elShells = domElement.querySelector(".shells"); 

        // Add number HTML
        elNumber.innerHTML = periodicEl.number;

        // Add symbol HTML
        elSymbol.innerHTML = periodicEl.symbol;

        // Add name HTML
        elName.innerHTML = periodicEl.name;

        // Add atomic_mass HTML
        elAtomicMass.innerHTML = periodicEl.atomic_mass.toFixed(2);


        // pushing Matter into Arrays for gas, solid, liquid, unkown
        if (periodicEl.phase === "Gas") {
            
            gasMatterArray.push(periodicEl.symbol.toLowerCase());

        } else if (periodicEl.phase === "Solid" && periodicEl.number < 104) {

            solidMatterArray.push(periodicEl.symbol.toLowerCase());
        
        } else if (periodicEl.phase === "Liquid") {

            liquidMatterArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.number > 103) {
            notNaturalMatterArray.push(periodicEl.symbol.toLowerCase());
        };

        // pushing Metals / Nonmetals into Arrays for the different types
        if (periodicEl.category === "alkali metal") {
            alkaliMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "alkaline earth metal") {
            alkalineEarthMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "lanthanide") {
            lanthanideArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "actinide") {
            actinideArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "transition metal") {
            transitionMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "metalloid") {
            metalloidsArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "post-transition metal") {
            postTransitionMetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "diatomic nonmetal" || periodicEl.category === "polyatomic nonmetal") {
            reactiveNonmetalArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "noble gas") {
            nobleGasArray.push(periodicEl.symbol.toLowerCase());
        } else if (periodicEl.category === "unknown, probably transition metal" || periodicEl.category === "unknown, probably post-transition metal" || periodicEl.category === "unknown, probably metalloid" || periodicEl.category === "unknown, predicted to be noble gas") {
            unknownMatterArray.push(periodicEl.symbol.toLowerCase());
        };
    });
};

function elementBoxesColorConfiguration() {
    matterTypesArray.forEach((backgroundColorConfiguration) => {
        backgroundColorConfiguration[1].elementsIdArray.forEach((id) => {
            document.querySelector("#" + id).style.backgroundColor = backgroundColorConfiguration[1].colorBackground;
            console.log("The elementsBoxesColorCOnfiguration Thing works!!!");
        });
    });
};


function mattterCategorizationConfigurator() {

    gasMatterArray.forEach(element => {
        document.querySelector("#" + element + " .number").style.color = "#FE0101";
    });
    
    solidMatterArray.forEach(element => {
        document.querySelector("#" + element + " .number").style.color = "#010101";
    });

    liquidMatterArray.forEach(element => {
        document.querySelector("#" + element + " .number").style.color = "#288300";
    });
    
    notNaturalMatterArray.forEach(element => {
        document.querySelector("#" + element + " .number").style.color = "#868686";
    });
};


function periodicTablePresenterGenerator() {

    // for presenter
    let elementBoxes = document.querySelectorAll(".el_box");
    let presenterBox = document.querySelector(".presenter");
    let presenterNumber = document.querySelector(".p_number");
    let presenterSymbol = document.querySelector(".p_symbol");
    let presenterName = document.querySelector(".p_name");
    let presenterAtomicMass = document.querySelector(".p_atomic_mass");
    let presenterShells = document.querySelector(".p_shells");

    elementBoxes.forEach(element => {
        element.addEventListener("mouseover", function(e) {
            
            // Change background color
            presenterBox.style.backgroundColor = e.currentTarget.style.backgroundColor;
    
            // Change Number
            const hoveredNumber = e.currentTarget.querySelector('.number').innerHTML;
            presenterNumber.innerHTML = periodicTable.elements[hoveredNumber - 1].number;
            document.querySelector(".presenter").append(presenterNumber);
    
            // Change Symbol
            const hoveredSymbol = e.currentTarget.querySelector('.symbol').innerHTML;
            presenterSymbol.innerHTML = periodicTable.elements[hoveredNumber - 1].symbol;
            document.querySelector(".presenter").append(presenterSymbol);
    
            // Change Name
            const hoveredName = e.currentTarget.querySelector('.name').innerHTML;
            presenterName.innerHTML = periodicTable.elements[hoveredNumber - 1].name;
            document.querySelector(".presenter").append(presenterName);
    
            // Change Atomic Mass
            const hoveredAtomicMass = e.currentTarget.querySelector('.atomic_mass').innerHTML;
            presenterAtomicMass.innerHTML = periodicTable.elements[hoveredNumber - 1].atomic_mass;
            document.querySelector(".presenter").append(presenterAtomicMass);
    
            // Change Shells
            presenterShells.innerHTML = periodicTable.elements[hoveredNumber - 1].shells;
    
                // Split Shells into sub divs (problem is that it is an entire String)
                let str = presenterShells.innerHTML;
                let subDivArray = str.split(",");
                // console.log(subDivArray);
                presenterShells.innerHTML = "";
    
                subDivArray.forEach(element => {
                    let domElementShells = document.createElement("div");
    
                    domElementShells.classList.add("shells_numbers");
                    domElementShells.innerHTML = element;
    
                    document.querySelector(".presenter .p_shells").append(domElementShells);
    
                });
        });
    });    
};


//[].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})