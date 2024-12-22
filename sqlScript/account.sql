insert into "accountHead" (id,code,account_head_name) values ('1','1','Assets');
insert into "accountHead" (id,code,account_head_name) values ('2','2','Liabilities');
insert into "accountHead" (id,code,account_head_name) values ('3','3','Equities');
insert into "accountHead" (id,code,account_head_name) values ('4','4','Revenues');
insert into "accountHead" (id,code,account_head_name) values ('5','5','Expenses');

insert into "accountControl" (id,code,account_control_name,account_head_code) values ('A01','101','Cash','1');
insert into "accountControl" (id,code,account_control_name,account_head_code) values ('A02','102','Bank Transfer','1'); 
insert into "accountControl" (id,code,account_control_name,account_head_code) values ('A03','103','Account Receivable','1'); 
insert into "accountControl" (id,code,account_control_name,account_head_code) values ('A04','104','Inventory','1'); 

insert into "accountControl" (id,code,account_control_name,account_head_code) values ('L01','201','Account Payable','2');
insert into "accountControl" (id,code,account_control_name,account_head_code) values ('L02','202','Salary Expense','2');
insert into "accountControl" (id,code,account_control_name,account_head_code) values ('L03','203','Interest Payable','2');

insert into "accountControl" (id,code,account_control_name,account_head_code) values ('R01','401','Sale Income','4');

insert into "accountControl" (id,code,account_control_name,account_head_code) values ('E01','501','Salary Expense','5');