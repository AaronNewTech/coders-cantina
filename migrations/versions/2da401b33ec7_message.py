"""message

Revision ID: 2da401b33ec7
Revises: c32cb64a5807
Create Date: 2023-08-30 13:42:41.918408

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2da401b33ec7'
down_revision = 'c32cb64a5807'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('drinks', schema=None) as batch_op:
        batch_op.drop_column('ingredient_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('drinks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ingredient_id', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
