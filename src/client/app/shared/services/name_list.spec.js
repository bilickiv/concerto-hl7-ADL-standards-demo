var name_list_1 = require('./name_list');
function main() {
    describe('NameList Service', () => {
        let nameList;
        beforeEach(() => {
            nameList = new name_list_1.NameList;
        });
        it('should return the list of names', () => {
            let names = nameList.get();
            expect(names).toEqual(jasmine.any(Array));
        });
    });
}
exports.main = main;
//# sourceMappingURL=name_list.spec.js.map