<div class="modal fade" id="modalClearLocalStorage" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Clear Local Storage</h4>
			</div>
			<div class="modal-body">
				<p><strong>Are you sure you want to clear the local storage?</strong></p>
				<p>Saving data to the local storage improves performance when loading and searching the wardrobe. GuildWars2 Wardrobe automatically saves to local storage, but will update frequently to allow new items to enter the storage.</p>
				<p><strong>Note!</strong> Clearing the storage will:</p>
				<ul>
					<li>Remove armors from the local storage.</li>
					<li>Remove weapons from the local storage.</li>
					<li>Clear your tracker.</li>
				</ul>
				
				<hr />
				
				<p>Saving to local storage is currently turned:</p>
				<div class="btn-group radioLocalStorage">
					<button type="button" class="btn btn-default" data-active="true" data-bind='css: {"active btn-success": localStorage()}'>On</button>
					<button type="button" class="btn btn-default" data-active="false" data-bind='css: {"active btn-danger": !localStorage()}'>Off</button>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal" data-bind="click: gw2w.storage.clear">Clear Local Storage</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->